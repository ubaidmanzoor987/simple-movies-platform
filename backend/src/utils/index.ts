import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseStringArrayPipe implements PipeTransform {
    transform(value: any) {
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
        } else if (Array.isArray(value)) {
            return value;
        } else {
            throw new BadRequestException('Validation failed: keywords should be a string or an array of strings');
        }
    }
}