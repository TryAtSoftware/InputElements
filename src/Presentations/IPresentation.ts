import { FormText } from '../Components';

export interface IPresentation {
    startLoading(): void;
    stopLoading(): void;
    hide(): void;
    show(): void;
}

export interface IChangingPresentation<TValue> {
    update(newValue: TValue): void;
}

export interface IRestrictedPresentation {
    setError(errorMessage: FormText): void;
}

export interface IDynamicPresentation<TDynamicProps> {
    changeDynamicProps(dynamicProps: TDynamicProps): void;
}
