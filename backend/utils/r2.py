import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import os

s3 = boto3.client(
    service_name="s3",
    endpoint_url="https://meaobjqsijtsedjlvlmz.supabase.co/storage/v1/s3",
    aws_access_key_id=os.getenv("S2_KEY_ID"),
    aws_secret_access_key=os.getenv("S2_ACCESS_KEY"),
    region_name="auto",
)

BUCKET_NAME = "hackathon_citynet"


def upload_file_to_r2(file_path: str, key: str, bucket_name: str = BUCKET_NAME) -> bool:
    try:
        s3.upload_file(file_path, bucket_name, key)
        return True
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False
    except PartialCredentialsError:
        return False
    except Exception as e:
        print(e)
        return False


def download_file_from_r2(
    key: str, bucket_name: str = BUCKET_NAME, temp_folder: str = "/tmp"
):

    try:
        temp_file_path = f"{temp_folder}/{key}"
        s3.download_file(bucket_name, key, temp_file_path)
        return temp_file_path
    except NoCredentialsError:
        raise FileNotFoundError("Credentials not available")
    except PartialCredentialsError:
        raise FileNotFoundError("Incomplete credentials provided")
    except Exception as e:
        raise FileNotFoundError(f"An error occurred: {str(e)}")


def delete_file_from_r2(key: str, bucket_name: str = BUCKET_NAME):
    try:
        s3.delete_object(Bucket=bucket_name, Key=key)
        return f"File deleted from s3://{bucket_name}/{key}"
    except NoCredentialsError:
        raise ValueError("Credentials not available")
    except PartialCredentialsError:
        raise ValueError("Incomplete credentials provided")


def generate_presigned_url(key: str, bucket_name: str = BUCKET_NAME):
    return s3.generate_presigned_url(
        "get_object", Params={"Bucket": bucket_name, "Key": key}, ExpiresIn=3600
    )
