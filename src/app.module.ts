import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeTokenModule } from './one-time-token/one-time-token.module';
import { UserModule } from './user/user.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { PreferenceModule } from './preference/preference.module';
import { PreferenceChoiceModule } from './preference-choice/preference-choice.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { UserMediaModule } from './user-media/user-media.module';
import { UserLocationModule } from './user-location/user-location.module';
import { PricingModule } from './pricing/pricing.module';
import { UserPricingModule } from './user-pricing/user-pricing.module';
import { MeetUpRequestModule } from './meet-up-request/meet-up-request.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { RequestLogModule } from './request-log/request-log.module';
import { ConfigModule as MyConfigModule } from './config/config.module';
import { User } from './user/entities/user.entity';
import { OneTimeToken } from './one-time-token/entities/one-time-token.entity';
import { UserActivity } from './user-activity/entities/user-activity.entity';
import { Preference } from './preference/entities/preference.entity';
import { PreferenceChoice } from './preference-choice/entities/preference-choice.entity';
import { UserPreference } from './user-preference/entities/user-preference.entity';
import { UserMedia } from './user-media/entities/user-media.entity';
import { UserLocation } from './user-location/entities/user-location.entity';
import { Pricing } from './pricing/entities/pricing.entity';
import { UserPricing } from './user-pricing/entities/user-pricing.entity';
import { MeetUpRequest } from './meet-up-request/entities/meet-up-request.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { Chat } from './chat/entities/chat.entity';
import { ChatMessage } from './chat-message/entities/chat-message.entity';
import { RequestLog } from './request-log/entities/request-log.entity';
import { Config } from './config/entities/config.entity';
import { RecommendationHistoryModule } from './recommendation-history/recommendation-history.module';
import { RecommendationHistory } from './recommendation-history/entities/recommendation-history.entity';
import { ResponsesHelper } from './helpers/responses';
import { UtilHelper } from './helpers/util';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          OneTimeToken,
          UserActivity,
          Preference,
          PreferenceChoice,
          UserPreference,
          UserMedia,
          UserLocation,
          Pricing,
          UserPricing,
          MeetUpRequest,
          Wallet,
          Transaction,
          Chat,
          ChatMessage,
          RequestLog,
          Config,
          RecommendationHistory,
        ],
        synchronize: true,
      }),
    }),
    OneTimeTokenModule,
    UserModule,
    UserActivityModule,
    PreferenceModule,
    PreferenceChoiceModule,
    UserPreferenceModule,
    UserMediaModule,
    UserLocationModule,
    PricingModule,
    UserPricingModule,
    MeetUpRequestModule,
    WalletModule,
    TransactionModule,
    ChatModule,
    ChatMessageModule,
    RequestLogModule,
    MyConfigModule,
    RecommendationHistoryModule,
    ResponsesHelper,
    UtilHelper,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
