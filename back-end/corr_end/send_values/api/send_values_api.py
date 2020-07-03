from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Correlations, Dinosaur, Link, Researcher

class ResearcherSerializer(ModelSerializer):
    class Meta:
        model = Researcher
        fields = ['name', 'institution', 'link']

    def validate(self, user_data):
        if not (user_data['name']):
            print('One or more of the fields is missing.')
            return ValidationError
        return user_data

    def create(self, user_data):
        new_researcher = Researcher.objects.create(**user_data)
        new_researcher.save()
        return new_researcher

    def update(self, existing_researcher, user_data):
        fields = ['name', 'institution', 'link']
        for i in fields:
            field_value = user_data.get(i, getattr(existing_researcher, i))
            setattr(existing_researcher, i, field_value)
        existing_researcher.save()
        return existing_researcher

# Parent Model is Link, Child Model is Researcher
class LinkSerializer(ModelSerializer):
    researchers = ResearcherSerializer(many=True, read_only=True)

    class Meta:
        model = Link
        fields = ['encode_url', 'submitted_by', 'researchers']

    def validate(self, user_data):
        if not (user_data['encode_url']):
            print('One or more of the fields is missing.')
            return ValidationError
        return user_data

    def create(self, user_data):
        new_link = Link.objects.create( **user_data )
        new_link.save()
        return new_link

    def update(self, existing_link, user_data):
        fields = ['encode_url', 'submitted_by']
        for i in fields:
            field_value = user_data.get( i, getattr( existing_link, i ) )
            setattr( existing_link, i, field_value )
        existing_link.save()
        return existing_link


'''
class NestedCountrySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    isd_code = serializers.IntegerField(required=False)
    short_name = serializers.CharField(required=False)
    addresses = AddressSerializer(many=True, read_only=True)
    class Meta:
        model = Country
        fields = ['name', 'isd_code', 'short_name', 'addresses']
'''


class CorrelationsSerializer(ModelSerializer):
    class Meta:
        model = Correlations
        fields = ['experimentName', 'rowNum', 'colNum', 'rowLabel', 'colLabel', 'corrValue']

    def validate(self, user_data):
        if not (user_data['experimentName'] or user_data['rowNum'] or user_data['colNum'] or user_data['rowLabel'] or user_data['colLabel'] or user_data['corrValue']):
            print('One or more of the fields is missing.')
            return ValidationError
        return user_data

    def create(self, user_data):
        new_correlation = Correlations.objects.create(**user_data)
        new_correlation.save()
        return new_correlation

    def update(self, existing_correlation, user_data):
        fields = ['experimentName', 'rowNum', 'colNum', 'rowLabel', 'colLabel', 'corrValue']
        for i in fields:
            field_value = user_data.get(i, getattr(existing_correlation, i))
            setattr(existing_correlation, i, field_value)
        existing_correlation.save()
        return existing_correlation

'''
GET partial response sample from http://127.0.0.1:8000/values/links/
{
        "encode_url": "http6",
        "submitted_by": "james6",
        "researchers": [
            {
                "name": "shaan",
                "institution": "bell",
                "link": 6
            },
            {
                "name": "jay",
                "institution": "bell",
                "link": 6
            },
            {
                "name": "shruthik",
                "institution": "bell",
                "link": 6
            }
        ]
    },
POST http://127.0.0.1:8000/values/links/
{
	"encode_url": "https://www.chess.com/",
	"submitted_by": "aditya"
}
'''
class LinksViewSet(ModelViewSet):
    serializer_class = LinkSerializer
    http_method_names = ['get', 'post', 'put', 'delete', 'options']
    queryset = Link.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ['encode_url', 'submitted_by']

'''
POST: http://127.0.0.1:8000/values/researchers/
{
	"name": "sushy",
	"institution": "bell",
	"link": 5
}
'''
class ResearcherViewSet(ModelViewSet):
    serializer_class = ResearcherSerializer
    http_method_names = ['get', 'post', 'put', 'delete', 'options']
    queryset = Researcher.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ['name', 'institution', 'link']

class CorrelationsViewSet(ModelViewSet):
    serializer_class = CorrelationsSerializer
    http_method_names = ['get', 'post', 'put', 'delete', 'options']
    queryset = Correlations.objects.all()
    filter_backends = (DjangoFilterBackend,)
    # filterset_fields = ('experimentName', 'rowNum', 'colNum', 'rowLabel', 'colLabel', 'corrValue')
    filterset_fields = ('experimentName', 'rowLabel', 'colLabel', 'corrValue')

class DinoSerializer(ModelSerializer):
    class Meta:
        model = Dinosaur
        fields = ['name', 'age', 'species']

    def validate(self, userData):
        if not userData['name']:
            print('name is required')
            return ValidationError
        return userData

    def create(self, userData):
        newDinosaur = Dinosaur.objects.create(**userData)
        newDinosaur.save()
        return newDinosaur

    def update(self, existingDinosaur, userData):
        fields = ['name', 'age', 'species']
        for i in fields:
            fieldValue = userData.get(i, getattr(existingDinosaur, i))
            setattr(existingDinosaur, i, fieldValue)
        existingDinosaur.save()
        return existingDinosaur

class DinoViewSet(ModelViewSet):
    serializer_class = DinoSerializer
    http_method_names = ['get', 'post', 'put', 'delete', 'options']
    queryset = Dinosaur.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('name', 'age', 'species')



