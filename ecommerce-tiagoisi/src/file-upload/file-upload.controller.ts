import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Cargar imagen para un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
          }
        }
      }
  })
  @ApiResponse({ status: 201, description: 'La imagen fue cargada correctamente' })
  @ApiResponse({ status: 400, description: 'Carga fallida' })
  @UseInterceptors(FileInterceptor('file'))
    async updloadImage(
    @Param('id') productId: string,
      @UploadedFile(
        new ParseFilePipe({ 
          validators: [
            new MaxFileSizeValidator({
              maxSize: 200000, 
              message: 'La imagen supera el maximo permitido de 200kb'
            }),
            new FileTypeValidator({
              fileType: /(.jpg|.png|webp|jpeg)/
            })
        ]
      })
    ) file: Express.Multer.File
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
