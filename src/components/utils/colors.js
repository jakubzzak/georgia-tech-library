const colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"]
export const getRandomColor  = () => {
  return `${colors[Math.floor(Math.random() * colors.length)]}`
}
