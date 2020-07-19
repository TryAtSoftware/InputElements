import * as React from 'react';
import BasicWorkflowSample from '../src/SingleValueInputElements/__samples__/BasicWorkflow.example';
import DependentInputSample from '../src/SingleValueInputElements/DependentInputElement/__samples__/DependentInput.example';
import DropdownInputSample from '../src/SingleValueInputElements/DropdownInputElement/__samples__/DropdownInput.example';
import DropdownInputWithDefaultValueSample from '../src/SingleValueInputElements/DropdownInputElement/__samples__/DropdownInputWithDefaultValue.example';
import HidingInputElementsSample from '../src/SingleValueInputElements/__samples__/HidingInputElement.example';
import InitialValueWorkflowSample from '../src/SingleValueInputElements/__samples__/InitialValueWorkflow.example';
import { Link } from 'office-ui-fabric-react';
import ListInputElementSample from '../src/DynamicListInputElement/__samples__/ListInputElement.example';
import LoadingInputElementsSample from '../src/SingleValueInputElements/__samples__/LoadingInputElements.example';
import MultipleDependenciesSample from '../src/SingleValueInputElements/DependentInputElement/__samples__/MultipleDependencies.example';
import MultipleOptionsListInputElementSample from '../src/DynamicListInputElement/__samples__/MultipleOptionsListInputElement.example';
import NonRequiredDependentInputSample from '../src/SingleValueInputElements/DependentInputElement/__samples__/NonRequiredDependentInput.example';
import NonRequiredValueSample from '../src/SingleValueInputElements/__samples__/NonRequiredValue.example';
import SequentialDependenciesSample from '../src/SingleValueInputElements/DependentInputElement/__samples__/SequentialDependencies.example';
import TextInputSample from '../src/SingleValueInputElements/TextInputElement/__samples__/TextInput.example';
import './styles.less';
import './App.less';

export default class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div id="app">
                <h1>Welcome to the Input Element Samples!</h1>
                <h2 id="basic-workflow">
                    <Link href="#basic-workflow">Basic workflow</Link>
                </h2>
                <BasicWorkflowSample />
                <NonRequiredValueSample />
                <InitialValueWorkflowSample />
                <LoadingInputElementsSample />
                <HidingInputElementsSample />

                <h2 id="text-input">
                    <Link href="#text-input">Text input</Link>
                </h2>
                <TextInputSample />

                <h2 id="dropdown-input">
                    <Link href="#dropdown-input">Dropdown input</Link>
                </h2>
                <DropdownInputSample />
                <DropdownInputWithDefaultValueSample />

                <h2 id="dependent-input">
                    <Link href="#dependent-input">Dependent input</Link>
                </h2>
                <DependentInputSample />
                <NonRequiredDependentInputSample />
                <MultipleDependenciesSample />
                <SequentialDependenciesSample />

                <h2 id="dynamic-list-input-elements">
                    <Link href="#dynamic-list-input-elements">Dynamic list input elements</Link>
                </h2>
                <ListInputElementSample />
                <MultipleOptionsListInputElementSample />
            </div>
        );
    }
}
