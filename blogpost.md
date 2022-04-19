# How I used Algolia to recreate r/place

If you land on this blog post, it's probably because you heard about r/place that took place on the first week of April.

I personally took part of it, and placed a few pixels here and there, I enjoyed it a lot, and I'm sure you did too!
It got me thinking ( a lot ) and I wondered if I could leverage the power of Algolia and it's fast indexing/browsing capabilities to create an experiment, inspired by r/place.

# From idea, to first drafts

The initial idea was to create an index, containing 100 records, and setup a new NextJS project to host my experiment on Vercel.

Each records contains a `bg_color` attribute

I used the `algoliasearch` to render every records on my page. The idea is quite simple, every hit is a div, and the div's background color is the `bg_color` value of the hit.

When you click on that div, it will send a `index.saveObject()` to Algolia, and replace the `bg_color` attribute with the current color you picked.

Now, 100 pixels is a bit small, but that was a good a start.

# Scaling the canvas up

Then, I've added a few more hits to the index, and I've scaled the canvas up to a grid containing 4020 pixels. I've sent the link to some friends, and they've started using the experiment.

![picture of the experiment](https://i.imgur.com/qZYZQZQ.png)

That gave me enough feedbacks to improve the algorithms. I thought it would be a good idea to implement a user counter, so that I could know how many people are on the canvas.

# implementing the user counter

For the user counter, I decided to use socket.io, hosted it on heroku, and use the `io.sockets.on('connection', (socket) => { ... })` to count the number of users. Each time a user connects, I send a `socket.emit('user_connected')` to the client. It gives me the number of users connected to the canvas at the same time. I also send a `socket.emit('user_disconnected')` when a user disconnects. In order to keep the number of users up to date.

# First drawings

At this point, the canvas had a few drawings, but there were one main issue with it, the indexing API key was exposed to the public, and it would allow people to hack around it, and change the color of the pixels with a batch request. To get around this issue, I've decided to use NextJS API routes to handle the requests & Keep my API key secret. The downside is that the indexing time went slightly up, but I think it's worth it, as it's only a few seconds, and that project was an experiment, a proof of concept.

# Making the canvas interactive

Now the fun part is to make the canvas interactive. As mentionned earlier, when you click on a pixel, it will send a `index.saveObject()` to Algolia, and I used algolia's browse method, to get all the hits at once, and then I used `.map()` to change the `bg_color` attribute of each hit. Which means that when you click the pixel:

- the div gets the color you've chosen
- then it sends the API request
- then the browse will return the pixel with the correct color.

_Note that I've used the browse method in order to get ALL the hits at once, as the pagination is limited to 1K records. The browse method allows me to perform an unpaginated search, and concatenate all the returned records in an array that I use to map over to render the divs_

# 4 times more space

Now it was time to make it bigger

# Even bigger

Once people started using it, I thought it would be a good thing to make it even bigger, so that it could be used in a bigger space. And allow people to unleash their creativity.

# How I've built the explorer ( aka snapshots )

# Buildign the explorer
