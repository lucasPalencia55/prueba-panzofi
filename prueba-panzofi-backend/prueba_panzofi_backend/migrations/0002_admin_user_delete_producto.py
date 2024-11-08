# Generated by Django 5.1.3 on 2024-11-07 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prueba_panzofi_backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('user_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('user_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('button1_count', models.DecimalField(decimal_places=2, max_digits=10)),
                ('button2_count', models.DecimalField(decimal_places=2, max_digits=10)),
                ('role', models.CharField(max_length=30)),
            ],
        ),
        migrations.DeleteModel(
            name='Producto',
        ),
    ]
