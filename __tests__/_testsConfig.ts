import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import { initializeIcons } from '@fluentui/react';

// The logic in this file is going to be executed before the tests are run.
// We want our snapshots to be as realistic as possible. That's why we want to initialize the icons.
initializeIcons();

Enzyme.configure({ adapter: new Adapter() });

// We want global errors and warnings logged in the console to lead to failed tests.
global.console.error = global.console.warn = function (message: string | Error): Error {
    throw message instanceof Error ? message : new Error(message);
};

jest.retryTimes(0);
