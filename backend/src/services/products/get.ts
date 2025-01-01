import type { FastifyPluginAsync } from "fastify"
import type { Product } from "@repo/shared/models"

export const getProducts: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/products",
    handler: async () => {
      const products: Product[] = [
        {
          id: 1,
          title: "Piña Colada",
          description:
            "Cocktail tropical à base de rhum, lait de coco et jus d'ananas.",
          priceCents: 850,
          imageURL:
            "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
          categoryId: 1,
        },
        {
          id: 6,
          title: "Smoothie Fruits Rouges",
          description:
            "Smoothie acidulé avec framboises, fraises, et myrtilles.",
          priceCents: 550,
          imageURL:
            "https://lavietrepidantedetwinsribbons.fr/wp-content/uploads/2019/01/1200x600-smoothie-fruits-rouges-1200x720.jpg",
          categoryId: 2,
        },
        {
          id: 2,
          title: "Mojito",
          description:
            "Cocktail rafraîchissant avec du rhum, citron vert, menthe et eau gazeuse.",
          priceCents: 750,
          imageURL:
            "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
          categoryId: 1,
        },
        {
          id: 3,
          title: "Tequila Sunrise",
          description:
            "Cocktail coloré avec de la tequila, du jus d'orange et de la grenadine.",
          priceCents: 900,
          imageURL:
            "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg",
          categoryId: 1,
        },
        {
          id: 12,
          title: "Irish Coffee",
          description:
            "Café irlandais avec du whisky, du sucre et de la crème.",
          priceCents: 600,
          imageURL:
            "https://creative-culinary.com/wp-content/uploads/irish-coffee-2.jpg",
          categoryId: 4,
        },
        {
          id: 5,
          title: "Smoothie Mangue",
          description:
            "Smoothie crémeux à base de mangue, banane et lait de coco.",
          priceCents: 500,
          imageURL:
            "https://www.thecocktaildb.com/images/media/drink/vdp2do1487603520.jpg",
          categoryId: 2,
        },
        {
          id: 7,
          title: "Smoothie Avocat",
          description: "Smoothie onctueux avec avocat et lait de coco.",
          priceCents: 600,
          imageURL:
            "https://img.cuisineaz.com/660x660/2016/03/30/i107862-smoothie-frappe-vietnamien-a-l-avocat.jpg",
          categoryId: 2,
        },
        {
          id: 8,
          title: "Thé à la Menthe",
          description: "Thé vert parfumé avec de la menthe.",
          priceCents: 400,
          imageURL:
            "https://img.cuisineaz.com/660x660/2016/06/21/i68333-the-a-la-menthe.jpeg",
          categoryId: 3,
        },
        {
          id: 4,
          title: "Bloody Mary",
          description:
            "Cocktail épicé avec de la vodka, du jus de tomate et des épices.",
          priceCents: 950,
          imageURL:
            "https://www.thecocktaildb.com/images/media/drink/t6caa21582485702.jpg",
          categoryId: 1,
        },
        {
          id: 11,
          title: "Barraquito",
          description:
            "Café espagnol crémeux à base de liqueur et de lait concentré.",
          priceCents: 550,
          imageURL:
            "https://cafemadrid.com.es/wp-content/uploads/2018/11/6r.png",
          categoryId: 4,
        },
      ]
      return products
    },
  })
}
