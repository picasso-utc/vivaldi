export async function getProductsList(){

    //Get datas from API
    const result = [
        {
            id: 1,
            name: "Snacks",
            products: [
                {
                    id: 1,
                    name: "Mars"
                },
                {
                    id: 2,
                    name: "Twix"
                },
                {
                    id: 3,
                    name: "Bounty"
                }
            ]
        },
        {
            id: 2,
            name: "Fruits",
            products: [
                {
                    id: 4,
                    name: "Pomme"
                },
                {
                    id: 5,
                    name: "Orange"
                },
                {
                    id: 6,
                    name: "Poire"
                }
            ]
        },
    ];
    return result;

} 

export async function getTimeSets(){


    //Get periods from API
    const result = [
        {
            id: 1,
            name: "Semaine de rentrée",
            start: new Date(2020, 1, 23),
            end: new Date(2020, 1, 30)
        },
        {
            id: 2,
            name: "Semaine blanche",
            start: new Date(2020, 3, 7),
            end: new Date(2020, 3, 14)
        },
    ];
    return result;
} 

export const diagramTypes = [
    {id: 1, su:"line", name: "Line Plot"},
    {id: 2, su:"column", name: "Histogramme"},
    {id: 3, su:"pie", name: "Camembert"},
]

export async function loadByProduct(start, end, idProduct) {
    //Requete API sur un produit + période
    const result = [
        
        { label: new Date().toLocaleDateString(),  y: 10  },
        { label: new Date(2020, 1, 1).toLocaleDateString(),  y: 40  },
        { label: new Date(2020, 1, 2).toLocaleDateString(), y: 15  },
        { label: new Date(2020, 1, 3).toLocaleDateString(), y: 25  },
        { label: new Date(2020, 1, 4).toLocaleDateString(),  y: 30  },
        { label: new Date(2020, 1, 5).toLocaleDateString(),  y: 28  } 
    ]
    
    return result;
}


export async function getProductFamily(idFamily) {
    //Requete API pour avoir les produits d'une famille
    const produits = [1,2,3,4];

    return produits;
}

