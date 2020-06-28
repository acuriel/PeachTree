from django.urls import path
from rest_framework import routers
from .views import *
from rest_framework_simplejwt import views as jwt_views

router = routers.SimpleRouter()
router.register(r'contractors', ContractorViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
  path('token', jwt_views.TokenObtainPairView.as_view(), name="token)obtain_pair"),
  path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls
