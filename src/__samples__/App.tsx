import * as React from 'react';
import BasicWorkflowSample from '../SingleValueInputElements/__samples__/BasicWorkflow.example';
import CustomPrecisionNumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/CustomPrecisionNumberInput.example';
import CustomStepNumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/CustomStepNumberInput.example';
import CustomVisualizationSequentialDependenciesSample from '../SingleValueInputElements/DependentInputElement/__samples__/CustomDependentVisualization.example';
import DecimalNumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/DecimalNumberInput.example';
import DependentInputSample from '../SingleValueInputElements/DependentInputElement/__samples__/DependentInput.example';
import DropdownInputSample from '../SingleValueInputElements/DropdownInputElement/__samples__/DropdownInput.example';
import DropdownInputWithDefaultValueSample from '../SingleValueInputElements/DropdownInputElement/__samples__/DropdownInputWithDefaultValue.example';
import HidingDependentInputSample from '../SingleValueInputElements/DependentInputElement/__samples__/HidingDependentInput.example';
import HidingInputElementsSample from '../SingleValueInputElements/__samples__/HidingInputElement.example';
import IdentityPickerSample from '../SingleValueInputElements/IdentityPickerInputElement/__samples__/IdentityPicker.example';
import IdentityPickerWithInitialValueSample from '../SingleValueInputElements/IdentityPickerInputElement/__samples__/IdentityPickerWithInitialValue.example';
import InitialValueWorkflowSample from '../SingleValueInputElements/__samples__/InitialValueWorkflow.example';
import { Link } from 'office-ui-fabric-react';
import ListInputElementSample from '../DynamicListInputElement/__samples__/ListInputElement.example';
import LoadingDependentInputSample from '../SingleValueInputElements/DependentInputElement/__samples__/LoadingDependentInput.example';
import LoadingInputElementsSample from '../SingleValueInputElements/__samples__/LoadingInputElements.example';
import MultipleDependenciesSample from '../SingleValueInputElements/DependentInputElement/__samples__/MultipleDependencies.example';
import MultipleOptionsListInputElementSample from '../DynamicListInputElement/__samples__/MultipleOptionsListInputElement.example';
import NonRequiredDependentInputSample from '../SingleValueInputElements/DependentInputElement/__samples__/NonRequiredDependentInput.example';
import NonRequiredValueSample from '../SingleValueInputElements/__samples__/NonRequiredValue.example';
import NumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/NumberInput.example';
import SequentialDependenciesSample from '../SingleValueInputElements/DependentInputElement/__samples__/SequentialDependencies.example';
import TextInputSample from '../SingleValueInputElements/TextInputElement/__samples__/TextInput.example';
import TimePickerSample from '../SingleValueInputElements/TimePickerInputElement/__samples__/TimePicker.example';
import TimePickerWithMonthsSample from '../SingleValueInputElements/TimePickerInputElement/__samples__/TimePickerWithMonths.example';
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

                <h2 id="number-input">
                    <Link href="#number-input">Number input</Link>
                </h2>
                <NumberInputSample />
                <CustomStepNumberInputSample />
                <DecimalNumberInputSample />
                <CustomPrecisionNumberInputSample />

                <h2 id="time-picker">
                    <Link href="#time-picker">Time picker</Link>
                </h2>
                <TimePickerSample />
                <TimePickerWithMonthsSample />

                <h2 id="identity-picker">
                    <Link href="#identity-picker">Identity picker</Link>
                </h2>
                <IdentityPickerSample />
                <IdentityPickerWithInitialValueSample />

                <h2 id="dependent-input">
                    <Link href="#dependent-input">Dependent input</Link>
                </h2>
                <DependentInputSample />
                <NonRequiredDependentInputSample />
                <MultipleDependenciesSample />
                <SequentialDependenciesSample />
                <CustomVisualizationSequentialDependenciesSample />
                <LoadingDependentInputSample />
                <HidingDependentInputSample />

                <h2 id="dynamic-list-input-elements">
                    <Link href="#dynamic-list-input-elements">Dynamic list input elements</Link>
                </h2>
                <ListInputElementSample />
                <MultipleOptionsListInputElementSample />
            </div>
        );
    }
}
