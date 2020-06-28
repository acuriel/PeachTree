from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class ContractorSerializer(serializers.ModelSerializer):
  class Meta():
    model = Contractor
    fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
  owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
  amount = serializers.ReadOnlyField()

  class Meta():
    model = Account
    fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
  class Meta():
    model = Transaction
    fields = '__all__'


class NestedTransactionSerializer(TransactionSerializer):
  contractor = ContractorSerializer()
  account = AccountSerializer()

  class Meta():
    model = Transaction
    fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
  class Meta():
    model = User
    fields = '__all__'
