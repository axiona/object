import Equal from '@alirya/boolean/equal-parameter';
import DifferenceBothParameters from './difference-both-parameters';
import {A} from 'ts-toolbelt';
import Compare from '@alirya/boolean/compare/compare';
import Callable from '@alirya/function/callable';


export type DifferenceBothParameterArgumentValidation<Type extends Record<PropertyKey, any>, CompareType extends Record<PropertyKey, any>> = {
    object :  A.At<Type, keyof Type|keyof CompareType>;
    compare : A.At<CompareType, keyof Type|keyof CompareType>;
    key: keyof Type|keyof CompareType;
};

export type DifferenceBothParameterArgument<Type extends Record<PropertyKey, any>, CompareType extends Record<PropertyKey, any>> = Compare<Readonly<Type>> & {
    object: Readonly<Type>,
    validation:  Callable<[DifferenceBothParameterArgumentValidation<Type, CompareType>], boolean>,
};

/**
 * option version of {@see DifferenceBothParameters}
 * @param list
 * @param validation
 */
export default function DifferenceBothParameter<Value extends Record<PropertyKey, any>, CompareType extends Record<PropertyKey, any> = Value>(
    {
        object,
        compare,
        validation = ({object, compare}) => Equal({value:object, compare}),
    } : DifferenceBothParameterArgument<Value, CompareType>
) : Partial<Value> {

    return DifferenceBothParameters(
        object,
        compare,
        (object, compare : any, key) => validation({key, object, compare})
    );
}
