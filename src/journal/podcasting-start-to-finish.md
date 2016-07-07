---
author: Brian Koser
collection: posts
description: How Brian and Melissa Koser record & edit the audio for their podcast, Ten to One, and other audio projects.
layout: journal.swig
pubdate: 2016-07-07
section: journal
tags: podcast
title: "Podcasting, Start to Finish"
---

We have a podcast, [Ten to One](tto.koser.us). We try to make it as high-quality as possible. That applies to the content, of course, but maybe just as noticeably, also to the audio quality and editing. Here's how the magic happens:

<h2>Equipment</h2>
<p>
    You can record audio on your smart phone or laptop, but high-quality audio requires better equipment. Each of us has:
    <ul>
        <li>Microphone
        <li>Boom arm
        <li>Pop filter
    </ul>
</p>

<h2>Software</h2>
<p>
    <ul>
        <li>[Audacity](www.audacityteam.org) to record. It has all the features we need and it's free.
        <li>Dynamic compressor
        <li>[iTunes]() to save audio as MP3. Audacity can export to MP3, and does well for music (higher quality), but iTunes does it better for audio (smaller files).
    </ul>
<p>

<h2>Recording</h2>
<p>
    <ol>
        <li>Open Audacity.
        <li>Plug in your mic and make sure it is being used as the input.
        <li>Press the Record button and start talking!
        <li>Press the Stop button when you are done or need to take a break.
        <li>If you want to record more, hold the <kbd><kbd>Shift</kbd></kbd> key and click the Record button to keep recording on the same track.
    </ol>

    <h3>Speaking into a microphone</h3>
    <p>
        <ul>
            <li>Keep your mouth facing the mic as much as possible.
            <li>Don't speak directly into the mic; talk past it. This, together with your pop filter, will prevent plosives (puffs of air when you make certain sounds) from annoying your listeners.
            <li>Instead of filling the silence with "uh"s or "um"s, try to pause silently when thinking about what to say next. You can easily remove those pauses later.
        </ul>
    </p>

    <h3>Save Everything</h3>
    <ol>
        <li>Save the Audacity project (.aup file). This is what you'll use to edit the audio. Do this as soon as you have enough audio that you wouldn't want to have to re-record.
        <li>Export to WAV. This is your backup of the original recording. If something goes wrong during editing, you can always come back to this backup. Do this when you are done recording.
    </ol>
</p>

<h2>Editing</h2>
<p>
    <ol>
        <li>
            <h3>Compress</h3>
            Effect > compress dynamics
        </li>
        <li>
            <h3>Remove Noise</h3>
            Effect > Noise removal
        </li>
        <li>
            <h3>Edit</h3>
            Edit > Clip boundaries > split (<kbd><kdb>Ctrl</kbd> + <kbd>I</kbd><kbd>)
            Zoom
            Timeshift tool
        </li>
        <li>
            <h3>Remove Silence</h3>
            Effect > Truncate silence
        </li>
        <li>
            <h3>Add other audio</h3>
            File > Import > Audio (<kbd><kdb>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd><kbd>)
        </li>
        <li>
            <h3>Fade in, fade out</h3>
        </li>
        <li>
            <h3>Export</h3>
        </li>
        <li>
            <h3>Create MP3 with iTunes</h3>
            Import
            Add metadata
            Export as MP3
            Lossless vs. lossy
        </li>
    </ol>
</p>