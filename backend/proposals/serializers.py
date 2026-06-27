from rest_framework import serializers
from .models import Proposal
from accounts.serializers import UserSerializer
from jobs.serializers import JobSerializer

class ProposalSerializer(serializers.ModelSerializer):
    freelancer = UserSerializer(read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = Proposal
        fields = ['id', 'job', 'job_title', 'freelancer', 
                  'cover_letter', 'bid_amount', 'status', 'created_at']
        read_only_fields = ['freelancer', 'status', 'created_at']