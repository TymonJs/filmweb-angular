interface Product {
    id: number,
    name: string,
    price: number
}

interface DigitalProduct extends Product {
    fileSizeMB: number,
    downloadLink: string
}

interface PhysicalProduct extends Product{
    weightKg: number,
    dimensions: {
        x: number,
        y: number,
        z: number
    }
}

function getProductSummary(product: (DigitalProduct | PhysicalProduct)): void {

    if ("fileSizeMB" in product){
        console.log(`This is a digital product. File size: ${product.fileSizeMB}. Download link: ${product.downloadLink}`);
    }
    else if ("weightKg" in product){
        const {x, y, z} = product.dimensions;
        console.log(`This is a physical product. Weight: ${product.weightKg}. Dimensions: ${x}x${y}x${z}`);
    }
    else{
        console.log("Unknown product");
        
    }
}


const ob: DigitalProduct = {
    id: 1,
    name: "płyta",
    price: 12,
    fileSizeMB: 20,
    downloadLink: "https://asd.com"
}
getProductSummary(ob)