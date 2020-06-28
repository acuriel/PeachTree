from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum


class Contractor(models.Model):
  name    = models.CharField(max_length=100)

  def __str__(self):
    return self.name


class Account(models.Model):
  owner     = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
  name      = models.CharField(max_length=250)

  '''
  Returns the total amount with payed transactions asociated to this account
  '''
  @property
  def amount(self):
    aggregation = self.transactions.filter(status='payed').aggregate(Sum('amount'))
    return aggregation["amount__sum"] if aggregation["amount__sum"] else 0

  def __str__(self):
    return self.name


class Transaction(models.Model):
  TRANSACTION_STATUSES = (
    ('sent', "Sent"),
    ('received', "Received"),
    ('payed', "Payed"),
  )

  creation_date       = models.DateTimeField(auto_now_add=True)
  modification_date   = models.DateTimeField(auto_now_add=True)
  contractor          = models.ForeignKey(Contractor, on_delete=models.CASCADE, related_name="transactions")
  account             = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
  amount              = models.FloatField()
  status              = models.CharField(choices=TRANSACTION_STATUSES, default='sent', max_length=10)

  @property
  def owner(self):
    return self.account.owner

  def __str__(self):
    return f'{self.contractor.name} ({self.amount})'

  class Meta:
    ordering = ['-modification_date', '-creation_date']
