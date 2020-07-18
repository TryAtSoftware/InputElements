import * as React from 'react';
import BasicWorkflowSample from '../src/SingleValueInputElements/__samples__/BasicWorkflow.example';
import DependentInputSample from '../src/SingleValueInputElements/DependentInputElement/__samples__/DependentInput.example';
import DropdownInputSample from '../src/SingleValueInputElements/DropdownInputElement/__samples__/DropdownInput.example';
import DropdownInputWithDefaultValueSample from '../src/SingleValueInputElements/DropdownInputElement/__samples__/DropdownInputWithDefaultValue.example';
import InitialValueWorkflowSample from '../src/SingleValueInputElements/__samples__/InitialValueWorkflow.example';
import NonRequiredValueSample from '../src/SingleValueInputElements/__samples__/NonRequiredValue.example';
import TextInputSample from '../src/SingleValueInputElements/TextInputElement/__samples__/TextInput.example';
import './styles.less';
import './App.less';

export default class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div id="app">
                <h1>Hi!</h1>
                <h2>Basic workflow:</h2>
                <BasicWorkflowSample />
                <NonRequiredValueSample />
                <InitialValueWorkflowSample />

                <h2>Text input:</h2>
                <TextInputSample />

                <h2>Dropdown input:</h2>
                <DropdownInputSample />
                <DropdownInputWithDefaultValueSample />

                <h2>Dependent input:</h2>
                <DependentInputSample />
            </div>
        );
    }
}
