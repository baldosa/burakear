export { default as Footer } from '../..\\components\\Footer.vue'
export { default as ScoreBoard } from '../..\\components\\ScoreBoard.vue'

export const LazyFooter = import('../..\\components\\Footer.vue' /* webpackChunkName: "components_Footer" */).then(c => c.default || c)
export const LazyScoreBoard = import('../..\\components\\ScoreBoard.vue' /* webpackChunkName: "components_ScoreBoard" */).then(c => c.default || c)
