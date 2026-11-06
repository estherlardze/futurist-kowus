export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  details: { label: string; value: string }[];
}

export const books: Book[] = [
  {
    id: "paying-my-debt",
    title: "Paying My Debt",
    author: "Daniel Owusu-Koranteng",
    category: "Autobiography",
    cover: "/images/pay.jpeg",
    description:
      "The autobiography of a man of many missions. From the loss of his father at nine to three decades of service to workers and mining communities, Paying My Debt chronicles a life of resilience and advocacy. Winner of the First Prize (Creative Non-Fiction) at the Ghana Association of Writers Literary Awards.",
    details: [
      { label: "Genre", value: "Autobiography" },
      { label: "Award", value: "Kofi Awoonor Prize, 2021" },
      { label: "Language", value: "English" },
    ],
  },
  {
    id: "wanderers-poems",
    title: "The Wanderer's Poems",
    author: "Daniel Owusu-Koranteng",
    category: "Poetry",
    cover: "/images/wan.jpeg",
    description:
      "An anthology of twenty-five poems reflecting on life, society and justice. The collection earned the People's Choice Best Poet Award for 2024, sponsored by the Africa Must Read Foundation.",
    details: [
      { label: "Genre", value: "Poetry" },
      { label: "Poems", value: "25" },
      { label: "Award", value: "People's Choice Best Poet, 2024" },
    ],
  },
    {
    id: "my-reflections-at-70",
    title: "My Reflections At 70",
    author: "Daniel Owusu-Koranteng",
    category: "Autobiography",
    cover: "/images/pay.jpeg",
    description:
      "The autobiography of a man of many missions. From the loss of his father at nine to three decades of service to workers and mining communities, Paying My Debt chronicles a life of resilience and advocacy. Winner of the First Prize (Creative Non-Fiction) at the Ghana Association of Writers Literary Awards.",
    details: [
      { label: "Genre", value: "Autobiography" },
      { label: "Award", value: "Kofi Awoonor Prize, 2021" },
      { label: "Language", value: "English" },
    ],
  },
];
