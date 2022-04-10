# How I used Algolia to recreate r/place

If you land on this blog post, it's probably because you heard about r/place that took place on the first week of April.

I personally took part of it, and placed a few pixels here and there, I enjoyed it a lot, and I'm sure you did too!
It got me thinking ( a lot ) and I wondered if I could leverage the power of Algolia and it's fast indexing/browsing capabilities to create an experiment, inspired by r/place.

# From idea, to first drafts

The initial idea was to create an index, containing 100 records, and setup a new NextJS project to host my experiment on Vercel.

I've used Algolia's InstantSearch React to render my Hits on my page. The idea is quite simple, every hit is a div, and the div's background color is the `bg_color` value of the hit.

When you click on that div, it will send a `index.saveObject()` to Algolia, and replace the `bg_color` attribute with the current color you picked.

Now, 100 pixels is a bit small, but that was a good a start.

# Scaling the canvas up

Now, I've added a "few" more hits to the index, and I've scaled the canvas up to a grid containing 4020 pixels.

# Making the canvas interactive

# Hiding API keys
