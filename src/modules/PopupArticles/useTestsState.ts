import {useListState} from "@mantine/hooks";

type TestName = 'select' | 'input' | 'question' | 'text'

export function useTestsState() {
    const [exercise, handlersExercise] = useListState<{name: string, list: TestName[]}>()

    const appendExercise = (name: string) => {
      handlersExercise.append({name, list: []})
    }

    const appendTest = (name: TestName) => {
        handlersExercise.setState(state => state.map((item, index) => index == --(state.length) ? ({...item, list: [...item.list, name]}) : item))
    }

    return {exercise, appendExercise,appendTest}
}