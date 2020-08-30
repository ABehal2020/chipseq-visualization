# Generated by Django 3.0.3 on 2020-08-26 15:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Correlations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experimentName', models.CharField(max_length=100)),
                ('rowNum', models.PositiveIntegerField()),
                ('colNum', models.PositiveIntegerField()),
                ('rowLabel', models.CharField(max_length=100)),
                ('colLabel', models.CharField(max_length=100)),
                ('corrValue', models.FloatField()),
            ],
            options={
                'ordering': ('experimentName',),
            },
        ),
        migrations.CreateModel(
            name='Dinosaur',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.PositiveIntegerField()),
                ('species', models.TextField()),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('encode_url', models.CharField(max_length=1000)),
                ('submitted_by', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('encode_url',),
            },
        ),
        migrations.CreateModel(
            name='Researcher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, help_text='J. Michael Cherry', max_length=512, null=True)),
                ('institution', models.CharField(blank=True, help_text='Stanford University', max_length=512, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now_add=True)),
                ('link', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='researchers', to='send_values.Link')),
            ],
            options={
                'ordering': ('institution',),
            },
        ),
    ]
