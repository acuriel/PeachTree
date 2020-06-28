from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from .permissions import *


class ContractorViewSet(viewsets.ModelViewSet):
  queryset = Contractor.objects.all()
  serializer_class = ContractorSerializer
  permission_classes = [permissions.IsAuthenticated]


class AccountViewSet(viewsets.ModelViewSet):
  queryset = Account.objects.all()
  serializer_class = AccountSerializer
  permission_classes = [permissions.IsAuthenticated, IsOwner]

  '''
  List just the accounts asociated to the signed user
  '''
  def list(self, request):
    queryset = Account.objects.all().filter(owner=request.user)
    serializer = AccountSerializer(queryset, many=True)
    return Response(serializer.data)


class TransactionViewSet(viewsets.ModelViewSet):
  queryset = Transaction.objects.all()
  permission_classes = [permissions.IsAuthenticated, IsOwner]

  '''
  List just the transactions asociated to the signed user
  '''
  def list(self, request):
    queryset = Transaction.objects.all().filter(account__owner=request.user)
    serializer = self.get_serializer_class()(queryset, many=True)
    return Response(serializer.data)

  '''
  In case of getting elements, use the deeper serializer,
  inclduing account and cotnractor data
  '''
  def get_serializer_class(self):
    if self.action in ('list', 'retrieve'):
      return NestedTransactionSerializer
    return TransactionSerializer

