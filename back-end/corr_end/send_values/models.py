from django.db import models

# Create your models here.
'''
# Sample post below
{
"experimentName": "replicateSV21",
"rowNum": "1",
"colNum": "1",
"rowLabel": "ENCFF415GFH",
"colLabel": "ENCFF415GFH",
"corrValue": "1.0"
}
'''

class Link(models.Model):
    encode_url = models.CharField(max_length=1000)
    submitted_by = models.CharField(max_length=100)
    created = models.DateTimeField( auto_now_add=True)
    updated = models.DateTimeField( auto_now_add=True, blank=True)

    class Meta:
        ordering = ('encode_url',)

    def __unicode__(self):
        return self.encode_url

class Researcher(models.Model):
    name = models.CharField(max_length=512, blank=True, null=True, help_text='J. Michael Cherry')
    institution = models.CharField(max_length=512, blank=True, null=True, help_text='Stanford University')
    link = models.ForeignKey(Link, blank=True, null=True, related_name='researchers', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        ordering = ('institution',)

    def __unicode__(self):
        return self.name

class Correlations(models.Model):
    experimentName = models.CharField(max_length=100)
    rowNum = models.PositiveIntegerField()
    colNum = models.PositiveIntegerField()
    rowLabel = models.CharField(max_length=100)
    colLabel = models.CharField(max_length=100)
    corrValue = models.FloatField()

    class Meta:
        ordering = ('experimentName',)

    def __unicode__(self):
        if not (self.experimentName or self.rowNum or self.colNum or self.rowLabel or self.colLabel or self.corrValue):
            return u'One or more of the fields is missing'
        else:
            return u'Id: %d, Experiment Name: %s, Row Num: %d, Col Num: %d, Row Label: %s, Col Label: %s, Corr Value: %f' \
                   % (self.experimentName, self.rowNum, self.colNum, self.rowLabel, self.colLabel, self.corrValue)

class Dinosaur(models.Model):
    age = models.PositiveIntegerField()
    species = models.TextField()
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ('name',)

    def __unicode__(self):
        if not self.name:
            name_details = 'No Name'
        else:
            name_details = self.name
        return 'name %s ' % [name_details]