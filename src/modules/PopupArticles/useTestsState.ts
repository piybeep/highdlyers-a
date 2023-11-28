import { useListState } from "@mantine/hooks";

type TestType = 'select' | 'input' | 'question' | 'text'
type TestList = {
  type: TestType,
  id: number
}
export type exerciseType = {
  name: string,
  list: TestList[]
}

export function useTestsState() {
  const [exercise, handlersExercise] = useListState<exerciseType>()

  const appendExercise = (name: string) => {
    handlersExercise.append({ name, list: [] })
  }

  const appendTest = (test: TestType) => {
    handlersExercise.setState(state => state.map((item, index) => index === state.length - 1 ? ({ ...item, list: [...item.list, { type: test, id: Date.now() }] }) : item))
  }

  const removeTest = (id: number) => {
    handlersExercise.setState(state => state.map(item => ({ name: item.name, list: item.list.filter(test => test.id != id) })))
  }

  return { exercise, appendExercise, appendTest, removeTest }
}