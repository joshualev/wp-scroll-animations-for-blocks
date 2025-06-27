/**
 * Primitive Menu Component
 * ========================
 * 
 * Professional dropdown menu using stable WordPress components.
 * Enhanced styling for modern, native WordPress appearance.
 */

import { __ } from "@wordpress/i18n";
import { Button, MenuGroup, MenuItem, Popover } from "@wordpress/components";
import { chevronDown } from "@wordpress/icons";
import { useState, useRef } from "@wordpress/element";

interface MenuOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface PrimitiveMenuProps {
    label?: string;
    value: string;
    options: MenuOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const PrimitiveMenu = ({ 
    label, 
    value, 
    options, 
    onChange, 
    placeholder = __("Select...", "motion-blocks"),
    className = ""
}: PrimitiveMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const selectedOption = options.find(option => option.value === value);
    const displayLabel = selectedOption ? selectedOption.label : placeholder;

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`motion-primitive-menu ${className}`}>
            {label && (
                <div className="motion-primitive-menu__label">
                    {label}
                </div>
            )}
            
            <div className="motion-primitive-menu__control">
                <Button
                    ref={buttonRef}
                    variant="secondary"
                    onClick={handleToggle}
                    icon={chevronDown}
                    iconPosition="right"
                    __next40pxDefaultSize
                    className="motion-primitive-menu__trigger"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                >
                    <span className={`motion-primitive-menu__display ${!selectedOption ? 'is-placeholder' : ''}`}>
                        {displayLabel}
                    </span>
                </Button>
                
                {isOpen && (
                    <Popover
                        placement="bottom-start"
                        onClose={() => setIsOpen(false)}
                        anchor={buttonRef.current}
                        className="motion-primitive-menu__popover"
                        offset={4}
                    >
                        <MenuGroup className="motion-primitive-menu__group">
                            {options.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <MenuItem
                                        key={option.value}
                                        onClick={() => !option.disabled && handleSelect(option.value)}
                                        disabled={option.disabled}
                                        className={`motion-primitive-menu__item ${isSelected ? 'is-selected' : ''}`}
                                    >
                                        {option.label}
                                    </MenuItem>
                                );
                            })}
                        </MenuGroup>
                    </Popover>
                )}
            </div>
        </div>
    );
}; 