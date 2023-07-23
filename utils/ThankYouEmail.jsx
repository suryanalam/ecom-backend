import React from 'react';
import { Email, Item, Span } from 'react-html-email';

const ThankYouEmail = ({ body: {name, desc1, desc2} }) => (
    <Email title="Thank You for Registering!">
        <Item>
            <Span fontSize={20}>
                Dear {name},
            </Span>
        </Item>
        <Item>
            {desc1}
        </Item>
        <Item>
            {desc2}
        </Item>
        <Item>
            Best regards,
            GoKart Team
        </Item>
    </Email>
);

export default ThankYouEmail;

/*

Thank you for registering on our website! We're excited to have you as a member of our community.

We hope you enjoy using our website and find everything you're looking for. If you have any questions or need help with anything, please don't hesitate to contact us.

*/