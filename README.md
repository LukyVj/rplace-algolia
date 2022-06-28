# r/place inspired canvas built with Algolia

<img width="826" alt="Screenshot 2022-06-28 at 09 20 30" src="https://user-images.githubusercontent.com/1630200/176118024-9e96ff1f-278b-4df4-a851-ee832941b3b7.png">

## :link: [Read the blog post on Algolia's blog](https://www.algolia.com/blog/engineering/how-i-recreated-r-place-with-algolia/)

This experiment is a canvas built entirely with Algolia.

It has some flaws, but it shows the power of Algolia, how fast it is, and how playful it can be.

The idea is that every pixel is basically a hit. When you click on a pixel, it will send a `index.saveObect()`, replacing an attribute value with the current color you've picked.

The index contains exactly 4020 hits, and this is what every hit contains:


```json
{
  "bg_color":"#000000",
  "id":1,
  "objectID":"1274ba8909a93a_dashboard_generated_id"
}
```

Then I use CSS grid to display the hits in a grid. In a pixelated way.

# Interactivity
This demo is "semi realtime" it's browsing the index every `600ms`, which allows you to witness pixels being colored whenever the index is updated. 
It also uses NextJS API pages with Vercel serverless functions to index the data, that ensure the API key won't leak. But by using serverless function, the data indexing is slightly longer compared to indexing directly from the client ( which is dangerous to do because you don't want to leak your api key and potentially allow people to batch update your index, resulting in a broken canvas ) 

To make it slightly faster, the serverless functions for this demo are hosted on a vercel server in France. 

To improve the sense of realtime, I went the easy way, instead of waiting for the updated data on the index, when you click the pixel: 

- the div gets the color you've chosen
- then it sends the API request
- then the browse will return the pixel with the correct color. 

Without the first step, it would take a few seconds between the click, and the color being applied on the pixel. 
