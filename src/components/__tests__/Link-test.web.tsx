import { mount } from 'enzyme';
import React from 'react';
import { Link } from '..';

it(`renders a complex gradient`, () => {
    const component = mount(
        <Link routeName="chat" params={{ roomId: 'hey!' }} />
    );

    expect(
        component
            .find('a')
            .first()
            .prop('href')
    ).toBe('/chat?roomId=hey!')
});
