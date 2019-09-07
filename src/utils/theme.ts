import { theme as defaultTheme } from '@chakra-ui/core';
import styled, { CreateStyled } from '../../node_modules/@emotion/styled';

export const theme = defaultTheme;

export default styled as CreateStyled<typeof theme>;
