# r/place inspired canvas built with Algolia

This experiment is a canvas built entirely with Algolia.

It has some flaws, but it shows the power of Algolia, how fast it is, and how playful it can be.

The idea is that every pixel is basically a hit. When you click on a pixel, it will send a `index.saveObect()`, replacing an attribute value with the current color you picked.

The index contains exactly 4020 hits, and this is what every hit contains:

```json
{
  "bg_color":"#000000",
  "id":1,
  "objectID":"1274ba8909a93a_dashboard_generated_id"
}
```

Then I use the power of CSS grid to display the hits in a grid. In a pixelated way.

# Please note

That this is a demo. It is not meant to be used in production. And it's easy to hack it because the custom `API_KEY` to search/index/browse the objects is exposed on the client.

There is also a way to achieve it through the NextJS API pages, but it's kind of longer and definitely breaks the playfulness of the demo.

Also note that hosting your functions in a region closer to the client is better.
