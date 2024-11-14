import React from 'react';
import BooleanVariables from './BooleanVariables';
import IfElse from './IfElse';
import TernaryOperator from './TernaryOperator';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ImpliedReturn from './ImpliedReturn';
import TemplateLiterals from './TemplateLiterals';
import SimpleArrays from './SimpleArrays';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ForLoops from './ForLoops';
import MapFunction from './MapFunction';
import TodoList from './todos/TodoList';
import Spreading from './Spreading'; 
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import ConditionalOutputInLine from './ConditionalOutputInLine';
import AddPathParameters from './AddPathParameters';
import Destructing from './Destructing';
import DestructingImports from './DestructingImports';
import FilterFunction from './FilterFunction';
import FindFunction from './FindFunction';
import FunctionDestructing from './FunctionDestructing';
import House from './House';
import JsonStringify from './JsonStringify';
import PathParameters from './PathParameters';
import Styles from './Styles';
import VariablesAndConstants from './VariablesAndConstants';
import VariableTypes from './VariableTypes';
import FindIndex from './FindIndex';
import { useSelector } from "react-redux";

const Lab3 = () => {
    const { todos } = useSelector((state: any) => state.todosReducer);

    console.log('Hello World!');
    return (
        <div>
            <h3>JavaScript</h3>
            <h2>Lab 3</h2>
            <ul className="list-group">
        {todos.map((todo: any) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
      <hr />
            <BooleanVariables />
            <IfElse />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInLine />
            <LegacyFunctions />
            <ArrowFunctions />
            <ImpliedReturn />
            <TemplateLiterals />
            <SimpleArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingToFromArrays />
            <ForLoops />
            <MapFunction />
            <TodoList />
            <Spreading />
            <Add a={3} b={4} />
            <h4>Square of 4</h4>
            <Square>4</Square>
            <hr />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <AddPathParameters />
            <Destructing />
            <DestructingImports />
            <FilterFunction />
            <FindFunction />
            <FindIndex />
            <FunctionDestructing />
            <House />
            <JsonStringify />
            <PathParameters />
            <Styles />
            <VariablesAndConstants />
            <VariableTypes />
        </div>
    );
};

export default Lab3;
