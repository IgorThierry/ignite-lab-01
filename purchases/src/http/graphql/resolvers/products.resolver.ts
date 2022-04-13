import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Product } from '../models/product';

import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.createProduct(data);
  }
}
