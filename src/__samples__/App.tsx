import { Link } from 'office-ui-fabric-react';
import * as React from 'react';
import BasicWorkflowSample from '../SingleValueInputElements/__samples__/BasicWorkflow.example';
import HidingInputElementsSample from '../SingleValueInputElements/__samples__/HidingInputElement.example';
import InitialValueWorkflowSample from '../SingleValueInputElements/__samples__/InitialValueWorkflow.example';
import LoadingInputElementsSample from '../SingleValueInputElements/__samples__/LoadingInputElements.example';
import NonRequiredValueSample from '../SingleValueInputElements/__samples__/NonRequiredValue.example';
import DropdownInputSample from '../SingleValueInputElements/DropdownInputElement/__samples__/DropdownInput.example';
import DropdownInputWithDefaultValueSample from '../SingleValueInputElements/DropdownInputElement/__samples__/DropdownInputWithDefaultValue.example';
import CustomStepNumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/CustomStepNumberInput.example';
import DecimalNumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/DecimalNumberInput.example';
import NumberInputSample from '../SingleValueInputElements/NumberInputElement/__samples__/NumberInput.example';
import TextInputSample from '../SingleValueInputElements/TextInputElement/__samples__/TextInput.example';
import './App.less';
import './styles.less';

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

                {/*<h2 id="time-picker">*/}
                {/*    <Link href="#time-picker">Time picker</Link>*/}
                {/*</h2>*/}
                {/*<TimePickerSample />*/}
                {/*<TimePickerWithMonthsSample />*/}

                {/*<h2 id="identity-picker">*/}
                {/*    <Link href="#identity-picker">Identity picker</Link>*/}
                {/*</h2>*/}
                {/*<IdentityPickerSample />*/}
                {/*<IdentityPickerWithInitialValueSample />*/}

                {/*<h2 id="dependent-input">*/}
                {/*    <Link href="#dependent-input">Dependent input</Link>*/}
                {/*</h2>*/}
                {/*<DependentInputSample />*/}
                {/*<NonRequiredDependentInputSample />*/}
                {/*<MultipleDependenciesSample />*/}
                {/*<SequentialDependenciesSample />*/}
                {/*<CustomVisualizationSequentialDependenciesSample />*/}
                {/*<LoadingDependentInputSample />*/}
                {/*<HidingDependentInputSample />*/}

                {/*<h2 id="dynamic-list-input-elements">*/}
                {/*    <Link href="#dynamic-list-input-elements">Dynamic list input elements</Link>*/}
                {/*</h2>*/}
                {/*<ListInputElementSample />*/}
                {/*<MultipleOptionsListInputElementSample />*/}
            </div>
        );
    }
}
