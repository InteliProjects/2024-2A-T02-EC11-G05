import React from 'react';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    children: React.ReactNode;
    className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className }) => {
    const Component = variant as keyof JSX.IntrinsicElements;

    return (
        <Component className={className}>
            {children}
        </Component>
    );
};

export default Typography;