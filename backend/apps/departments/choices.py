from django.db import models


class RegionChoices(models.TextChoices):
    Kyiv = "Kyiv"
    Chernihiv = "Chernihiv"
    Sevastopol = "Sevastopol"
    Cherkasy = "Cherkasy"
    Khmelnytskyi = "Khmelnytskyi"
    Chernivtsi = "Chernivtsi"
    Kherson = "Kherson"
    Kharkiv = "Kharkiv"
    Ternopil = "Ternopil"
    Vinnitsya = "Vinnitsya"
    Sumy = "Sumy"
    Rivne = "Rivne"
    Poltava = "Poltava"
    Odesa = "Odesa"
    Lviv = "Lviv"
    Luhansk = "Luhansk"
    Kirovohrad = "Kirovohrad"
    Ivano_Frankivsk = "Ivano_Frankivsk"
    Zaporizhya = "Zaporizhya"
    Zhytomyr = "Zhytomyr"
    Donetsk = "Donetsk"
    Crimea = "Crimea"
    Dnipro = "Dnipro"
    Volin = "Volin"
