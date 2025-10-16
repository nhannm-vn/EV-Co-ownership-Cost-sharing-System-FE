export type Category = {
  id: number
  name: string
  key: string
}

export type FAQ = {
  question: string
  answer: string
}

export type FagSection = {
  [key: string]: FAQ[]
}
