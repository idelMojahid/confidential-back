#!/bin/bash

PUBLIC_IP_ADDRESS=$(wget -qO- http://checkip.amazonaws.com)
echo "Authorizing CircleCi Public IP address: $PUBLIC_IP_ADDRESS"
aws ec2 authorize-security-group-ingress --region $AWS_REGION --group-id $AWS_SECURITY_GROUP --protocol tcp --port 22 --cidr $PUBLIC_IP_ADDRESS/32
echo "Done"
