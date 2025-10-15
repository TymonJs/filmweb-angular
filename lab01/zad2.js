const process = (prods) => {
  const processed = prods.reduce((acc,{product, region,sales}) => {
    if (!acc.some(p => p.product===product)){
      acc = [...acc,
        {product, regions: new Set(), sales: 0}
      ]
    }
    const index = acc.findIndex(c => c.product===product)
    
    acc[index].regions.add(region)
    acc[index].sales+=sales

    return acc
  },[])

  const res = processed.filter(p => p.regions.size===4).sort((a,b) => a.sales-b.sales)
  return res
}

const prods = [
  { product: 'A', region: 'North', sales: 100 },
  { product: 'A', region: 'South', sales: 150 },
  { product: 'B', region: 'North', sales: 200 },
  { product: 'B', region: 'South', sales: 250 },
  { product: 'C', region: 'North', sales: 300 },
  { product: 'A', region: 'East', sales: 120 },
  { product: 'A', region: 'West', sales: 120 },
]

const res = process(prods)


console.log(res);
