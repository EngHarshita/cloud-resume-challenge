import json
import boto3
import os
from botocore.exceptions import ClientError

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
TABLE_NAME = os.environ.get('DYNAMODB_TABLE', 'cloud-resume-challenge')
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    """
    AWS Lambda function for the Cloud Resume Challenge visitor counter.
    Increments a visitor counter in DynamoDB and returns the updated count.
    Supports CORS to allow request invocation from the static portfolio website.
    """
    
    # Define standard CORS headers
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
    }

    # Handle preflight OPTIONS request
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS' or \
       event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight request successful'})
        }

    try:
        # Atomic update of the visitor counter item in DynamoDB
        # table schema: partition key 'id' (String)
        response = table.update_item(
            Key={'id': 'visitors'},
            UpdateExpression="ADD #count_val :inc",
            ExpressionAttributeNames={'#count_val': 'count'},
            ExpressionAttributeValues={':inc': 1},
            ReturnValues="UPDATED_NEW"
        )
        
        # Extract the updated count from response
        updated_count = int(response['Attributes']['count'])
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'count': updated_count
            })
        }
        
    except ClientError as e:
        print(f"DynamoDB ClientError: {e.response['Error']['Message']}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Database transaction failed',
                'details': e.response['Error']['Message']
            })
        }
    except Exception as e:
        print(f"Unhandled Exception: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Internal server error occurred',
                'details': str(e)
            })
        }
