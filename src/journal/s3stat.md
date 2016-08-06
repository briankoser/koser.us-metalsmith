---
author: Brian Koser
collection: posts
description: Brian Koser details how he uses S3Stat to track file downloads from Amazon S3.
layout: journal.swig
pubdate: 2016-07-30
section: journal
tags: podcast
title: "S3Stat is ridiculously easy download tracking for Amazon S3"
---

After recently starting our podcast ([Ten to One](http://tto.koser.us), where we make top ten lists about everything), one of our first questions was: is anyone listening? Now, we’re just podcasting for fun, so we’re not concerned with getting a bunch of people to listen. But we’re still curious. Since the podcast files are hosted on Amazon’s S3, I started looking into ways of tracking downloads.

Let me save you some time: there’s no easy, accurate way to do it yourself.

<figure>
    <img src="/img/journal/oldbookillustrations-rudder-fatum.jpg" alt="Tracking Amazon S3 downloads">
    <figcaption>Me, calculating Amazon S3 downloads</figcaption>
</figure>

Thankfully, you don’t have to do it yourself: [S3Stat](https://www.s3stat.com/) will do it for you! After a fifteen-minute setup, all I had to do was wait for the data to come in.

S3Stat collects the data and gives you some wonderful tables and graphs. You know I love graphs.

<img src="/img/journal/s3stat-graph.png" alt="Graph of Amazon S3 downloads">

For a hobby podcast like ours, I can’t justify paying $10/month for tracking download stats when we pay only pennies a month for website hosting and file storage. However, S3Stat has offered to give a free license to anyone who blogs about their product. Very generous!

To conclude: tracking S3 downloads yourself is ridiculously hard; S3Stat makes it ridiculously easy. For both businesses and hobby users using S3, their service is a no-brainer.