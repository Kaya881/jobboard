from rest_framework import serializers
from .models import Job, Category
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class JobSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'client', 'category', 
                  'category_name', 'budget', 'deadline', 'status', 
                  'skills_required', 'created_at']
        read_only_fields = ['client', 'created_at']