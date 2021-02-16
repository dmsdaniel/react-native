import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';

export default function Picker({ onChange, tipo }) {
    return (
        <PickerView>
            <RNPickerSelect
                style={{
                    width: '100%'
                }}
                placeholder={{
                    label: 'Selecione o tipo',
                    color: '#222'
                }}
                value={tipo}
                onValueChange={ (valor) => onChange(valor)}
                items={[
                    { label: 'Receita', value: 'receita', color: '#222' },
                    { label: 'Despesa', value: 'despesa', color: '#222' },
                ]}
            />
        </PickerView>
    );
}