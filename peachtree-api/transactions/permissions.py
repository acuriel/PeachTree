from rest_framework import permissions

'''
Give permission if current instance was created by the current user
'''
class IsOwner(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    return obj.owner == request.user
