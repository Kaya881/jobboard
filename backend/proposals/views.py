from rest_framework import generics, permissions
from .models import Proposal
from .serializers import ProposalSerializer

class ProposalListCreateView(generics.ListCreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            return Proposal.objects.filter(job__client=user)
        return Proposal.objects.filter(freelancer=user)

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

class ProposalDetailView(generics.RetrieveUpdateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]