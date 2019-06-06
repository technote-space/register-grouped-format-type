import { getFormatName, registerFormatTypeGroup, registerGroupedFormatType } from './utils';

wp.richText.extension = wp.richText.extension || {};
wp.richText.extension.registerGroupedFormatType = registerGroupedFormatType;
wp.richText.extension.registerFormatTypeGroup = registerFormatTypeGroup;
wp.richText.extension.getFormatName = getFormatName;
