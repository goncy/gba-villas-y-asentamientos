import R from 'ramda'
import fuzzy from 'fuzzy'

export const shapeResponse = response => ({
  category: response.category_name,
  created: response.created_at,
  last_modified: response.modified_at,
  title: response.title,
  user: response.user,
  items: response.result
    .slice(1, response.result.length)
    .map(item => ({
      coordinates: R.pipe(
        R.view(R.lensIndex(2)),
        R.replace(/,0.0 /g, ','),
        R.split(','),
        R.splitEvery(2),
        R.dropLast(1),
        R.map(item => ({
          lat: parseFloat(R.view(R.lensIndex(1), item)),
          lng: parseFloat(R.view(R.lensIndex(0), item))
        })),
        R.filter(item => item.lat && item.lng)
      )(item),
      coordinates_type: item[3],
      id: item[4],
      region: item[6],
      city: item[7],
      created: item[9],
      name: item[10],
      type: item[11],
      stabilished: item[12],
      integrants: item[13],
      surface: item[14],
      direction: item[15],
      electricity: item[16],
      street_electricity: item[17],
      water: item[18],
      sewer: item[19],
      gas: item[20],
      streets: item[21]
    })
  )
})

export const filterItemsByName = (criteria, list) => fuzzy
  .filter(criteria, list, {extract: item => item.name})