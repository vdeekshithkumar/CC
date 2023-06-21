USE [master]
GO
/****** Object:  Database [CC_Models]    Script Date: 01-05-2023 18:01:01 ******/
CREATE DATABASE [CC_Models]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CC_Models', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\CC_Models.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CC_Models_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\CC_Models_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [CC_Models] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CC_Models].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CC_Models] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CC_Models] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CC_Models] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CC_Models] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CC_Models] SET ARITHABORT OFF 
GO
ALTER DATABASE [CC_Models] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CC_Models] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CC_Models] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CC_Models] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CC_Models] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CC_Models] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CC_Models] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CC_Models] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CC_Models] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CC_Models] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CC_Models] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CC_Models] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CC_Models] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CC_Models] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CC_Models] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CC_Models] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CC_Models] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CC_Models] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CC_Models] SET  MULTI_USER 
GO
ALTER DATABASE [CC_Models] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CC_Models] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CC_Models] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CC_Models] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CC_Models] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CC_Models] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'CC_Models', N'ON'
GO
ALTER DATABASE [CC_Models] SET QUERY_STORE = ON
GO
ALTER DATABASE [CC_Models] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [CC_Models]
GO
/****** Object:  Table [dbo].[advertisement]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[advertisement](
	[ad_id] [int] IDENTITY(1,1) NOT NULL,
	[date_created] [date] NULL,
	[from_date] [date] NULL,
	[expiry_date] [date] NULL,
	[type_of_ad] [nvarchar](50) NULL,
	[container_type_id] [int] NULL,
	[price] [decimal](18, 2) NULL,
	[status] [nvarchar](50) NULL,
	[quantity] [int] NULL,
	[port_id] [int] NULL,
	[company_id] [int] NOT NULL,
	[posted_by] [int] NOT NULL,
	[contents] [nvarchar](50) NULL,
	[file] [nvarchar](max) NULL,
	[port_of_departure] [nvarchar](50) NULL,
	[port_of_arrival] [nvarchar](50) NULL,
	[free_days] [int] NULL,
	[per_diem] [int] NULL,
	[pickup_charges] [decimal](18, 4) NULL,
 CONSTRAINT [PK__advertis__CAA4A6271D124F02] PRIMARY KEY CLUSTERED 
(
	[ad_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[company]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company](
	[company_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[licence_id] [int] NOT NULL,
	[domain_address] [nvarchar](50) NOT NULL,
	[company_logo] [nvarchar](max) NULL,
	[company_location] [nvarchar](50) NULL,
	[country] [nvarchar](50) NULL,
	[rating] [decimal](4, 2) NULL,
	[address] [nvarchar](50) NULL,
 CONSTRAINT [PK_company] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[container]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[container](
	[container_id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[capacity] [decimal](5, 2) NOT NULL,
	[availability] [nvarchar](50) NOT NULL,
	[price] [decimal](8, 3) NOT NULL,
	[mfg] [date] NOT NULL,
	[serial_no] [nvarchar](50) NOT NULL,
	[container_type_id] [int] NOT NULL,
	[port_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[container_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[container_type]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[container_type](
	[container_type_id] [int] IDENTITY(1,1) NOT NULL,
	[type] [nvarchar](50) NOT NULL,
	[capacity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[container_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contracts]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contracts](
	[contract_id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[content] [nvarchar](50) NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[uploaded_file] [nvarchar](max) NOT NULL,
	[updated_by] [int] NOT NULL,
	[updated_date_time] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[contract_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventory]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory](
	[inventory_id] [int] IDENTITY(1,1) NOT NULL,
	[date_created] [date] NOT NULL,
	[last_modified] [date] NOT NULL,
	[company_id] [int] NOT NULL,
	[container_type] [nvarchar](50) NOT NULL,
	[available] [int] NOT NULL,
	[maximum] [int] NOT NULL,
	[minimum] [int] NOT NULL,
	[port_id] [int] NOT NULL,
	[updated_by] [int] NOT NULL,
	[container_size] [int] NOT NULL,
	[surplus] [int] NOT NULL,
	[deficit] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[inventory_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message](
	[message_id] [int] IDENTITY(1,1) NOT NULL,
	[negotiation_id] [int] NOT NULL,
	[sender_id] [int] NOT NULL,
	[company_id] [int] NOT NULL,
	[message_body] [nvarchar](50) NULL,
	[created_time] [date] NOT NULL,
	[status] [nvarchar](50) NULL,
	[container_image] [image] NULL,
	[recipent_company_id] [int] NOT NULL,
	[updated_date_time] [date] NOT NULL,
	[updated_by] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[message_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[negotiation]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[negotiation](
	[negotiation_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[ad_id] [int] NOT NULL,
	[price] [decimal](18, 2) NOT NULL,
	[negotiation_type] [nvarchar](50) NULL,
	[container_type] [nvarchar](50) NULL,
	[quantity] [int] NOT NULL,
	[status] [nvarchar](50) NULL,
	[company_id] [int] NOT NULL,
	[contract_id] [int] NOT NULL,
	[date_created] [date] NOT NULL,
	[expiry_date] [date] NOT NULL,
	[updated_by] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[negotiation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permission](
	[permission_id] [int] IDENTITY(1,1) NOT NULL,
	[type] [nvarchar](max) NOT NULL,
	[actions] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_permission] PRIMARY KEY CLUSTERED 
(
	[permission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ports]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ports](
	[port_id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[port_name] [nvarchar](50) NOT NULL,
	[latitude] [decimal](5, 2) NOT NULL,
	[longitude] [decimal](5, 2) NOT NULL,
	[state] [nvarchar](50) NULL,
	[country] [nvarchar](50) NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[region] [nvarchar](50) NULL,
	[sub_region] [nvarchar](50) NULL,
	[status] [nvarchar](50) NULL,
	[port_code] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[port_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transaction]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transaction](
	[transaction_id] [int] IDENTITY(1,1) NOT NULL,
	[contract_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[date_time] [date] NOT NULL,
	[amount] [decimal](8, 3) NULL,
	[status] [nvarchar](50) NULL,
	[updated_by] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[transaction_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[up_mapping]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[up_mapping](
	[up_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[permission_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[up_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 01-05-2023 18:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[fname] [nvarchar](50) NOT NULL,
	[lname] [nvarchar](50) NOT NULL,
	[address] [nvarchar](100) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[phone_no] [nvarchar](20) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[is_verified] [int] NOT NULL,
	[is_approved] [int] NOT NULL,
	[is_active] [int] NOT NULL,
	[last_login] [datetime] NOT NULL,
	[designation] [nvarchar](50) NOT NULL,
	[otp] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[advertisement] ON 

INSERT [dbo].[advertisement] ([ad_id], [date_created], [from_date], [expiry_date], [type_of_ad], [container_type_id], [price], [status], [quantity], [port_id], [company_id], [posted_by], [contents], [file], [port_of_departure], [port_of_arrival], [free_days], [per_diem], [pickup_charges]) VALUES (5, CAST(N'2023-04-30' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'2023-04-30' AS Date), N'swap', 1, CAST(2323.00 AS Decimal(18, 2)), N'pending', 12, 1, 1, 29, N'fghjk', N'1_1oZER30ciWVx2US-KpoOAAOm_0UMX0u', N'trtyui', N'uiop', 456, 567, CAST(567.0000 AS Decimal(18, 4)))
INSERT [dbo].[advertisement] ([ad_id], [date_created], [from_date], [expiry_date], [type_of_ad], [container_type_id], [price], [status], [quantity], [port_id], [company_id], [posted_by], [contents], [file], [port_of_departure], [port_of_arrival], [free_days], [per_diem], [pickup_charges]) VALUES (7, CAST(N'2023-04-30' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'2023-04-30' AS Date), N'Buy', 2, CAST(2345.00 AS Decimal(18, 2)), N'pending', 123, 3, 3, 29, N'test up', N'1rvYW8MkrPvDxVsWuAL9djsRlLYO6tJjI', N'Oran', N'UT&TU', 23456, 2345, CAST(2345.0000 AS Decimal(18, 4)))
INSERT [dbo].[advertisement] ([ad_id], [date_created], [from_date], [expiry_date], [type_of_ad], [container_type_id], [price], [status], [quantity], [port_id], [company_id], [posted_by], [contents], [file], [port_of_departure], [port_of_arrival], [free_days], [per_diem], [pickup_charges]) VALUES (8, CAST(N'2023-05-01' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), N'undefined', 1, CAST(45.00 AS Decimal(18, 2)), N'pending', 345, 4, 3, 29, N'fg', N'1PZmHCcAUgpWWzWF7TY3VE_YdyPLBYKDt', N'Vlore', N'Vlore', 567, 56, CAST(56.0000 AS Decimal(18, 4)))
SET IDENTITY_INSERT [dbo].[advertisement] OFF
GO
SET IDENTITY_INSERT [dbo].[company] ON 

INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (1, N'mnnm', 56, N'mnnm', N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAjCAYAAABGiuIFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA4uSURBVHhe7VwJdFTVGX4BpC7FulESxEyotFj0aC0eJZOZRCtaqx6ttejR1qXW1p4qtO6ShSGGJCCmqKd6oIIoNHtCQoIBSWCSSMUFFRGtUles0poFCFRku7ff9959k3ffTCYzRE9Dmu+c/9z73/u/9zJvvvm3NxNDvDLyVPF20ityc5IUbyTNFQ3jvmE4IcrOMkTlW4Yo32+I4kxDLjhC7USGKL4Vtl2Qjw1Zer5ajQh/o7ja1yrafC2iLX21uEYtD6I/AyR5Qb4/WpIw8r2TQZrEm9SWYcgNRxii9EVD1klDVkBqIcU/VbvhMAlVDZtKy1aUfmqIpUlqV4O/Sd7sbxH70p+XMn2dlGlNYk9qUJyhtgfRXwHC7JKbQBbKP0aDMKNy1RYIU5FovukmCUohy0mYB9SuDlGc1U2WEkgVCFMCr1QWRoK0VeKW9Faxl0TxNUnpb7ZIM6lRXKJMBtFfIV5P7JRvKsJsAWE2JeaoLUWYEoQWmzA1IEHxvWq3G6Jkuk4W2q6gbYkhg8OUlYm01eIOf6vYT89CsvjWSHnBK/Awa0TrxEb5LWU2iP4KsTGxIz7ClN6jdi1oYYhkKYPUw658FY7XCGCRBd7EQZbzX8YYFC+lNcpkZTaI/oz4CePwMGFhiGShZylfg9B1krIykdYobvE/r3sWksXfLF7MCIoxymwQ/R3xE6bsj+aeKM6LTJbSlYZYNNK0UfA1it8jDO11hyHfWvHCuQ2DZDmsEB9hlnG8GWS5w6qYSBauUxiGylag7NbCkG+NmJreQxg6Z5U4RZn1FZcmJCRUYrzIUgfxtSE+wsCLiJJXIbu6yRLKWVYYYuEIdaQJb6OYCs9yUCMLPUvzV0oWohqEkYo0g+g7Tse9bMKYaqkOxEcYCsplsyfjTHBLkeDqniX1OTENOcsBehcnWfxB0epfKSL2ZvoA28NcaKmD6COu4gcQ428s1YH4CWOLTRaGoZrj1BEmkLNMi+hZ1orW85aLUcrMxHn3b0tJzer0KHUQ/QNXKML8ylIdODTC2Akuw1CtFoaYs/hbXDmLFYbWZwRlojIz4c1uvzNt5u42ije7I7y/M4j/FeixSZgbLNWB+AkTyllqIuQsd4Z5Fqt0XpfhqoZSszvu9wV2S9+De6Q/b68EYQ74ctomqu14wRL+Z5ATTM0whkAug5xmar0jAcJnWd83NR0Mn1dApuMmzsZ4H+RiyPGQSPBCfmJNYwLPlW5NNfDDdfmQIUMyHddlJ7yn6xLu130s5BKcIwvnKOK5oHNf8/IOHAVhanGNIsxtkGMgjCBWFIk76bVK52UgDE8egq9JZLK978xZ7A4u8plvKzMTqVkdM/0P7pVpgS4QpV2mzdgpfYFd0pvTdoEyiRdT1Au0Hy0Mh74VElR6b7iAx+OGao89oN+B9Q7uQbog/4TsVvoHMLnRstRQRhuM2mvuAYnKtspSQ7gT623qOjsh2nXxd/1C2bnB8+3DOH3YsGE+zN9VxxyAfAkRSv8M53B7j2OxvhLyEYTXo92/Ie9APoRshc3kOAhjkwU5i1hK5oaA3GSaWTq7yOIPyubIZPkSJLHI4s3plBkFUsLjVGUE5JHKLF5cyxeI8VJLhctISMhXa+GZvguwq4V8gek4a8UYDlnK4yEtQ4cO5QNX9pboUfnJvwHrb6j9QuhOXMR1jFa/KjoeULaTLdU4CvoSdd510K+GnAgxr4s3+Tqsv66Ooddx4xTsdWJcj7EdsgHHMA/h66JXGQ/9d1h/W51jKsTGkVjLhSyCNHAfEoQ8DnkS8jRszoiRMOy/MAxV1LrDUFqT+IM7DJlNuWbRklEntW6vN/PzgEkW5Vm8Odtlev5BzLfXee9t084bJ2wX6gwFJ2ONn8reSu2zeSzkCaWTQLxxXJsHlW4+Eo7BvkkqzJ3JIZYSWiH0QJoXdoHH85PcgjlDIjELun1d7RmcA0djv5h2mLuT0jFYp1fg3lKI/lWVbhwPG5KB3uhsa0mD6XExTrFUB2IgzFZDrmYYKjfEEsazELwMQyBKWOncLIK+BqF1e1Mz23J1zwKy5B2Qk7I7S868e5t23kNAJMLwnZur1iPdFBPY55u+H9Px1orxA+j7ICuUHg0MfS9DtmHufL1XYo0h7halhwF7v6QNpvbf/D3ofANrLTUq6A1eg+zEfLS1ZIKE2QV5B/NoZCXOhN1ByJNKdyKOKmmjgzCiZDRkN/KVOkMu1sIFcpYs5ix8mBgiywaO4aWzGYZy9TCUboahzqoJAUn331dEJAyQgnXG7sVKd2M89kiOJUonCngu5ABMXnsFwxXtMb3OWjFB7/EBZBPmkV7fMOxtgLyGub2frc7zQ0vtFfZrvtVSTZAwX0AeV3pUwI5k34LpUGslhDgI81piQG1hc+l4eJZFIIveZ2kS92kJ7lo7ZxFrwzyLK2dJM8OQkN4ZO/oahpzoiTDEfOztxXiqpWr4kzouVJ1Bp6v+BNOe3LkbSbBn4vqYpVqAB7lLnTvSF87MshU21yudYN7wIcZYr8t8hR+GRUonTMJgjJTfhAG2f4V0Yco8yYnYCSPfGDVTbWETlZAo0lwbqp7p6cxZwsNQ/WTt+ywyYVJm2yMsmbUwNOsAc5aSi/oehpyIRhh6EYachy01hOOwzkrEGQKGQGdVsJ5za6lX0FuwsihXuo0TsbZNncv5CcaSmeN8hPnR1pK5xk87bWMF/37mQM8qnbAJM9dSowO2T0NIdneZfYiEcSGtUWSHlc4IQ2lrZLNOFjblOgrTZx0EWXY6yHJQwuMUj5u6JdZPUayIRhiCeUo7RrtPQw9wuzrGZ62YwJIZKt7C3O2me8II2LP0fkrpIeAaM7DOazgfimZwDXvOEp5JbzPWGcJiJepJsO+E1CmdiJcwz0B2YepuAdiEudlSHdAIw69obkyapbY02DlLrKWzL3dPiCxmGAJZvFnbi505S8AIDClIXnY5pcKoiPUNioTeCHMO9xkmlM6kcQuEFYr2BmHtKQhDWKxf6DqX58Z4t6VqsCu1kBfAvAayHVP3m/QE1v+DMdaHsuZ1Ic4ezldFGDNpxxjeZwoRhvLxyUx67Zsagm+1yMtggtuiyIKcRXVw68+qkY78RiakZrYXmU05LQyZpXPJxN/K0C8OAkl1RxcmV5XMTamXlHzMF3v0xDoO9EYY3pzlEDafSBDb/iruuXAZ9yD5So8K2LFvwpDXU1e5SF3ruxQ1j3TuH6m9By01OmC7mPYQZyj8qghzIc+NMYwLFmH4iwGLLMvlpmSt9YwwlJPxN50sqoNb760VWtKKMPQocxS3Z2EYyrjpwxAZ7h615JgCz7KqR8Y+J2d7auRDKXWmFCaX2Q2seNErYYDJyoZd4UYI+yR2DuEEcxLu0/ZKayky4LFupB3kUbUUCeOwT481A1KIOXOGSN6L+RMT34OovHr7Xs9tsON1vy7CsGO8A0IPrMMkzCf8ecnoGrl55DfVsolQ6UyyIASZZHkVY1CsOrdBaN1ekGWef9Z+kGWHIssOsylHsjjD0JwTF47I91RXzRu7ShZ6qmWBp9IiSwrmKZXnKbN4EQth2DNhBfS5sr3dWo6I78DmPdqBFOyGuhN05g8zuQ/ZSN1ajgzYMLlkubsXolVTLpyK/U8g+9V1tfcDYMMtD8LrMi97H+LOYfZgjJUw9I4RH2Pg+mb+BWFLgp1iNhITDPn3JCk2J5XJoEcLB/AsuQxDztLZDENB0TBplQglj2YYymp/yKqGbM+yQ/rz9iEc7Vg4ZYoM5SaFySuOB0HqnGSZk1IrHx67gvM8iXMp03hxPV8cxssttUeY3/OAsEKJ9hCP4JtXp+z5Ji7DGlvk9RC23e2b2dODPCfOgq1JGMztBmFPOA12K9T5P4VeDbGvy6qOz4P4OIJV2KeQNTxIgaU270M0UoYA21KIwDTSa6CnZV7Fv4Pl+2eQdYbYlLRENOi1PzxLYcZ6V87CBHetqMuokE7WJ6Rmtz3md4Sh7pyl4yknWeaMXziiMHnZswxD3WSpkUUgS76nIqa4HQUT8GL4rCNSr8UJ3oT5GHt6eBcJfD7FRPhVCBNllr+PYC2mxp4CPRI9m7NB2Bt+DHsShR1dPkR8GWskQsgLY60QnsDZuKMXZXjs+ceGOq6F8DFEtF+zXoxz/hnyHOa8dzqQm+RmvODKWczSWdSHh6HtyFm6w5AXI5tyDEOXPCpCJLRyFj0MzfHAs6TQs5R3/3BugAJv6j244fzkn2OtDBDAswT4bMgmi5+e5SWMa0SlM8GdENg8HB7kcX8eyaLCEMjCMJSas2OxVjqPKT+hILm6JjwMPSvzx5RHLOEHGPi1AbrzBqUPDHgZhtyeBWHIt1Ysn7iguxxmzuLN+nwBv5LAXMUKQ/AsII83q32BEQiE+hrzPDXHIQyt1MNQLcIQyNL3MHS4wG4QDpyfAfsa5eyewpBeOoMsKJ1Nz6LIQs/CUjo1u31+RkCGHskXwbOALKvcnqXIDEOVAz4MKdgNQj5kjP5fLw4XwIPcpZElaFVDIEuNO2dJze7ItfosOllAoqedZAlMqBien1xdRs+C3MURhurhWcp7fPQw0IDc5dfKuzgfMh7eADF2mmRRfRbzR2Yt4hk9DIFY+V0jEXK2+3P3WGSxw1B253xnGCIKPZVnFyRX7X8oZbmDLGY1FPk/PwxQgDDsDy3E9FA72P0PaU3i9fNRQtulMxLf8gkV4d9RmVS09ShvVtubZglt91mQszhLZxuFnpqUguTKf5Ek7ORaZKn8v/EsAxrwMKent4rNJAzI85eMYM/fq03LbJ/kndH1rjdn+4HUrLaoFc7ssdU/n+OpaS/0LOsqSKmcppYHcVjDMP4LcP4GbpOfXD0AAAAASUVORK5CYII=', N'kjbnbs', N'snbn', CAST(9.00 AS Decimal(4, 2)), N'kjsksk')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (2, N'IVO Consultant', 84, N'www.IVOYANTConsultant.com', N'㩃啜敳獲呜牡⁡⁇屐楐瑣牵獥卜牣敥獮潨獴汜汩祬樮杰', N'Kerala', N'India', CAST(4.10 AS Decimal(4, 2)), N'31th cross')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (3, N'DEF Consultant', 897, N'www.DEFConsultant.com', N'㩃啜敳獲呜牡⁡⁇屐楐瑣牵獥卜牣敥獮潨獴灜灯数⹹灪g', N'Kolatta', N'India', CAST(4.20 AS Decimal(4, 2)), N'2th cross')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (4, N'TTR LTD ', 56, N'mnnm', N'data:image/png;base64,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', N'kjbnbs', N'snbn', CAST(9.00 AS Decimal(4, 2)), N'kjsksk')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (5, N'JKL Consultant', 897, N'www.JKLConsultant.com', N'㩃啜敳獲呜牡⁡⁇屐楐瑣牵獥卜牣敥獮潨獴瑜汵灩樮杰', N'Bangalore', N'India', CAST(4.40 AS Decimal(4, 2)), N'4th cross')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (6, N'KLM Consultant', 897, N'www.KLMConsultant.com', N'㩃啜敳獲呜牡⁡⁇屐楐瑣牵獥卜牣敥獮潨獴摜桡楬⹡灪g', N'Jaipur', N'India', CAST(4.50 AS Decimal(4, 2)), N'5th cross')
INSERT [dbo].[company] ([company_id], [name], [licence_id], [domain_address], [company_logo], [company_location], [country], [rating], [address]) VALUES (7, N'marine', 6989, N'www.asgg.com', N'㩃啜敳獲呜敨敪䑜睯汮慯獤䥜䝍〲㌲㈰㌱㔱㈱㜳樮杰', N'blr', N'india', CAST(8.70 AS Decimal(4, 2)), N'jp nagar')
SET IDENTITY_INSERT [dbo].[company] OFF
GO
SET IDENTITY_INSERT [dbo].[container_type] ON 

INSERT [dbo].[container_type] ([container_type_id], [type], [capacity]) VALUES (1, N'Refrigerated', 1)
INSERT [dbo].[container_type] ([container_type_id], [type], [capacity]) VALUES (2, N'Non-Refrigerated', 1)
SET IDENTITY_INSERT [dbo].[container_type] OFF
GO
SET IDENTITY_INSERT [dbo].[contracts] ON 

INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (1, 2, 10, N'some random words', N'2a6af6af-068c-4bbd-8c5f-d40df4e51482.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\2a6af6af-068c-4bbd-8c5f-d40df4e51482.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (2, 2, 10, N'some random words', N'833aaf1b-2d87-4633-a530-2d560dfe748e.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\833aaf1b-2d87-4633-a530-2d560dfe748e.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (3, 2, 10, N'some random words', N'1fc26c88-789f-4321-bac7-603e6b94761c.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\1fc26c88-789f-4321-bac7-603e6b94761c.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (4, 2, 10, N'some random words', N'88e3e958-5816-49c0-8e1e-becf51263e38.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\88e3e958-5816-49c0-8e1e-becf51263e38.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (5, 2, 10, N'some random words', N'7233f102-cab5-4ebe-b4bf-548fc8f141cc.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\7233f102-cab5-4ebe-b4bf-548fc8f141cc.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (6, 2, 10, N'some random words', N'9aa6f867-354a-4172-b5d5-feb6801440d2.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\9aa6f867-354a-4172-b5d5-feb6801440d2.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (7, 2, 10, N'some random words', N'bac2cd23-9979-4911-9841-dd00f93a81ec.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\bac2cd23-9979-4911-9841-dd00f93a81ec.pdf', 10, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (8, 1, 8, N'some random words', N'c8f11dbd-15aa-4a36-acdf-b138a45acb18.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\c8f11dbd-15aa-4a36-acdf-b138a45acb18.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (9, 1, 8, N'some random words', N'f269d067-6c4f-4abf-b6e6-243b946fad5f.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\f269d067-6c4f-4abf-b6e6-243b946fad5f.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (10, 1, 8, N'hello', N'yytyyrrrt', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\d3d08ac7-4cdf-43fd-bda4-49fd2a14b339.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (11, 1, 8, N'gghhghf', N'hgfdff', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\308d9d87-b91d-4447-8697-8267398b7d0e.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (12, 1, 8, N'heiuuu', N'begf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\a1169b85-d683-4094-8886-9afec0332bff.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (13, 1, 8, N'uyuuyyuyyy', N'uyttvgs', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\76a15b3c-427c-45f1-b031-22f4e4e55714.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (14, 1, 8, N'hhet', N'testing', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\9601ffb4-96b1-4a3d-bd38-2d0ef7286dda.xlsx', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (15, 1, 8, N'gor', N'utut', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\9805d341-0438-4686-92cd-25f19826ff5b.pdf', 8, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (16, 4, 1002, N'yyu', N'rrrrrrrrrrrrrrr', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\b94bc629-b15b-41e4-b90c-f842cf21d896.pdf', 1002, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (18, 1, 29, N'tthehg', N'NDA-THEJESH.pdf', N'C:\Users\Theje\Documents\GitHub\Container-conundrum\CC_api\wwwroot\981713d1-ec4f-4402-a40d-a37b8b9164d8.pdf', 29, CAST(N'2023-04-19' AS Date))
INSERT [dbo].[contracts] ([contract_id], [company_id], [user_id], [content], [title], [uploaded_file], [updated_by], [updated_date_time]) VALUES (19, 1, 8, N'tested tdy', N'Asset Issue Form.pdf', N'1CUYFtffLCKqjt5sX04GkUWhIXsojfujU', 8, CAST(N'2023-04-28' AS Date))
SET IDENTITY_INSERT [dbo].[contracts] OFF
GO
SET IDENTITY_INSERT [dbo].[inventory] ON 

INSERT [dbo].[inventory] ([inventory_id], [date_created], [last_modified], [company_id], [container_type], [available], [maximum], [minimum], [port_id], [updated_by], [container_size], [surplus], [deficit]) VALUES (1, CAST(N'2023-04-30' AS Date), CAST(N'2023-04-30' AS Date), 1, N'non_refrigerated', 1000, 6000, 3000, 1, 8, 1, 0, 2000)
SET IDENTITY_INSERT [dbo].[inventory] OFF
GO
SET IDENTITY_INSERT [dbo].[permission] ON 

INSERT [dbo].[permission] ([permission_id], [type], [actions]) VALUES (1, N'advertisement', N'read')
INSERT [dbo].[permission] ([permission_id], [type], [actions]) VALUES (2, N'advertisement', N'write')
INSERT [dbo].[permission] ([permission_id], [type], [actions]) VALUES (3, N'negotiation', N'read')
INSERT [dbo].[permission] ([permission_id], [type], [actions]) VALUES (4, N'negotiation', N'write')
SET IDENTITY_INSERT [dbo].[permission] OFF
GO
SET IDENTITY_INSERT [dbo].[ports] ON 

INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (1, 2, N'UT&TU', CAST(40.32 AS Decimal(5, 2)), CAST(78.09 AS Decimal(5, 2)), N'kar', N'india', N'blr', N'north', N'dhtg', N'surplus', N'IND56,1')
INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (2, 2, N'Vlore', CAST(40.27 AS Decimal(5, 2)), CAST(19.28 AS Decimal(5, 2)), N'', N'Albania', N'Albania', N'', N'', N'Available', N'ALVAL')
INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (3, 3, N'Valona', CAST(40.27 AS Decimal(5, 2)), CAST(19.28 AS Decimal(5, 2)), N'', N'Albania', N'Albania', N'', N'', N'Available', N'ALVAL')
INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (4, 5, N'Oran', CAST(35.43 AS Decimal(5, 2)), CAST(0.39 AS Decimal(5, 2)), N'', N'Algeria', N'Algeria', N'', N'', N'Busy', N'DZORN')
INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (5, 4, N'Sorrel', CAST(46.01 AS Decimal(5, 2)), CAST(73.01 AS Decimal(5, 2)), N'', N'Canada', N'Ontoria', N'', N'', N'Partially Available', N'CASOR')
INSERT [dbo].[ports] ([port_id], [company_id], [port_name], [latitude], [longitude], [state], [country], [city], [region], [sub_region], [status], [port_code]) VALUES (6, 6, N'Madras', CAST(13.06 AS Decimal(5, 2)), CAST(80.17 AS Decimal(5, 2)), N'', N'India', N'Southern India', N'', N'Chennai', N'Busy', N'INMAA')
SET IDENTITY_INSERT [dbo].[ports] OFF
GO
SET IDENTITY_INSERT [dbo].[up_mapping] ON 

INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (2, 2, 4)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (3, 2, 3)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (4, 2, 1)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (5, 2, 1)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1003, 1010, 4)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1006, 29, 2)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1010, 1012, 3)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1014, 5, 2)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1015, 5, 4)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1018, 1018, 2)
INSERT [dbo].[up_mapping] ([up_id], [user_id], [permission_id]) VALUES (1019, 1018, 4)
SET IDENTITY_INSERT [dbo].[up_mapping] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (2, 2, N'Vishrutha', N'vignesh', N'india', N'v@gmail.com', N'9875446788', N'123', 1, 0, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (3, 4, N'Avi', N'oo', N'fgc', N'ffgdgd', N'9875446788', N'tfhgff', 1, 0, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (5, 1, N'testk', N'K', N'e', N'k1@gmail.com', N'03656272804', N'123', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (8, 1, N'amal', N'sghggh', N'gfhgsh', N'a@gmail.com', N'9875446788', N'123', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (10, 2, N'Harish', N'oo', N'fgc', N'h@gmail.com', N'9875446788', N'123', 1, 0, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (11, 1, N'ravi', N'sghggh', N'gfhgsh', N'r@gmail.com', N'9875446788', N'123', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (15, 3, N'b', N'oo', N'fgc', N'b@gmail.com', N'9875446788', N'123', 0, 0, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (17, 2, N'd', N'oo', N'fgc', N'd@gmail.com', N'9875446788', N'123', 0, 1, 0, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (18, 4, N'e', N'oo', N'fgc', N'e@gmail.com', N'9875446788', N'123', 0, 1, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (19, 2, N'f', N'oo', N'fgc', N'f@gmail.com', N'9875446788', N'123', 1, 0, 0, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (20, 7, N'j', N'oo', N'fgc', N'j@gmail.com', N'9875446788', N'123', 1, 1, 0, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (21, 6, N'm', N'oo', N'fgc', N'm@gmail.com', N'9875446788', N'123', 0, 0, 0, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (22, 3, N'o', N'oo', N'fgc', N'o@gmail.com', N'9875446788', N'123', 1, 0, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (23, 3, N'x', N'oo', N'fgc', N'x@gmail.com', N'9875446788', N'123', 1, 1, 1, CAST(N'2023-07-15T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (24, 4, N'tttttt', N'oo', N'fgc', N't', N'9875446788', N'123', 1, 1, 1, CAST(N'2023-04-10T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (25, 1, N'fanbns', N'oo', N'fgc', N'freds', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-10T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (26, 3, N'fanbns', N'oo', N'fgc', N'hareiiiyyy', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-10T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (27, 3, N'ramesh', N'oo', N'fgc', N'acchu@gmail.com', N'9875446788', N'123', 1, 1, 1, CAST(N'2023-04-11T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (28, 4, N'fanbns', N'oo', N'fgc', N'hh', N'9875446788', N'123', 1, 0, 1, CAST(N'2023-04-11T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (29, 3, N'yyyyyyyyyyyyyyyyyy', N'K', N'sdhgd', N'DeekshithK@ivoyant.com', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (30, 1, N'bavi', N'string', N'string', N'string', N'string', N'string', 1, 1, 1, CAST(N'2023-04-12T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (32, 1, N'string', N'string', N'string', N'string', N'string', N'string', 0, 0, 0, CAST(N'2023-04-14T05:17:09.350' AS DateTime), N'string', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (34, 1, N'fanbns', N'oo', N'fgc', N'ffgdgd', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-14T00:00:00.000' AS DateTime), N'admin', 0)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1002, 4, N'srikant', N'oo', N'fgc', N'Vishruthaa@ivoyant.com', N'9875446788', N'123', 1, 1, 1, CAST(N'2023-04-18T00:00:00.000' AS DateTime), N'admin', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1004, 2, N'fanbns', N'oo', N'fgc', N'manjubugdue@gmail.com', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-19T00:00:00.000' AS DateTime), N'admin', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1007, 3, N'bavi', N'hyg', N'hgf', N'sbhavish87@gmail.com', N'9875446788', N'12345', 1, 1, 1, CAST(N'2023-04-19T00:00:00.000' AS DateTime), N'admin', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1008, 3, N'VV', N'oo', N'india', N'vacharyaiv@gmail.com', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-20T00:00:00.000' AS DateTime), N'admin', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1009, 2, N'raviiiiiis', N'oo', N'india', N'vacharyaiv@gmail.com', N'9875446788', N'tfhgff', 1, 1, 1, CAST(N'2023-04-20T00:00:00.000' AS DateTime), N'admin', 174412)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1010, 1, N'addemployeee', N'test', N'bajal', N'vishuvishrutha9569@gmail.com', N'9875446788', N'123', 1, 1, 0, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1011, 5, N'THEJESH', N'UPPALA', N'India', N'ThejeshM@ivoyant.com', N'9875446788', N'1234', 1, 1, 1, CAST(N'2023-04-24T00:00:00.000' AS DateTime), N'admin', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1012, 1, N'T', N'y', N'e', N'1@ivoyant.com', N'03656272804', N'1', 1, 1, 0, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', -1)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1013, 1, N'THEJESH', N'ss', N'e', N'12@ivoyant.com', N'03656272804', N'12', 1, 1, 0, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', 923576)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1014, 5, N'THEJESH', N'oo', N'e', N'1@ivoyant.com', N'03656272804', N'tfhgff', 1, 1, 1, CAST(N'2023-04-25T00:00:00.000' AS DateTime), N'admin', 476826)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1017, 1, N'k', N'k', N'e', N'k@gmail.com', N'9876543', N'12345', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', 545884)
INSERT [dbo].[users] ([user_id], [company_id], [fname], [lname], [address], [email], [phone_no], [password], [is_verified], [is_approved], [is_active], [last_login], [designation], [otp]) VALUES (1018, 1, N'k', N'g', N'e', N'test@gmail.com', N'9876543', N'12345', 1, 1, 1, CAST(N'2024-07-15T00:00:00.000' AS DateTime), N'user', 360147)
SET IDENTITY_INSERT [dbo].[users] OFF
GO
ALTER TABLE [dbo].[inventory] ADD  DEFAULT ((0)) FOR [container_size]
GO
ALTER TABLE [dbo].[inventory] ADD  DEFAULT ((0)) FOR [surplus]
GO
ALTER TABLE [dbo].[inventory] ADD  DEFAULT ((0)) FOR [deficit]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [otp]
GO
ALTER TABLE [dbo].[advertisement]  WITH CHECK ADD  CONSTRAINT [FK__advertise__compa__5070F446] FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[advertisement] CHECK CONSTRAINT [FK__advertise__compa__5070F446]
GO
ALTER TABLE [dbo].[advertisement]  WITH CHECK ADD  CONSTRAINT [FK__advertise__conta__5165187F] FOREIGN KEY([container_type_id])
REFERENCES [dbo].[container_type] ([container_type_id])
GO
ALTER TABLE [dbo].[advertisement] CHECK CONSTRAINT [FK__advertise__conta__5165187F]
GO
ALTER TABLE [dbo].[advertisement]  WITH CHECK ADD  CONSTRAINT [FK__advertise__port___52593CB8] FOREIGN KEY([port_id])
REFERENCES [dbo].[ports] ([port_id])
GO
ALTER TABLE [dbo].[advertisement] CHECK CONSTRAINT [FK__advertise__port___52593CB8]
GO
ALTER TABLE [dbo].[advertisement]  WITH CHECK ADD  CONSTRAINT [FK__advertise__poste__534D60F1] FOREIGN KEY([posted_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[advertisement] CHECK CONSTRAINT [FK__advertise__poste__534D60F1]
GO
ALTER TABLE [dbo].[container]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[container]  WITH CHECK ADD FOREIGN KEY([container_type_id])
REFERENCES [dbo].[container_type] ([container_type_id])
GO
ALTER TABLE [dbo].[container]  WITH CHECK ADD FOREIGN KEY([port_id])
REFERENCES [dbo].[ports] ([port_id])
GO
ALTER TABLE [dbo].[contracts]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[contracts]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[contracts]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[inventory]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[inventory]  WITH CHECK ADD FOREIGN KEY([port_id])
REFERENCES [dbo].[ports] ([port_id])
GO
ALTER TABLE [dbo].[inventory]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD FOREIGN KEY([negotiation_id])
REFERENCES [dbo].[negotiation] ([negotiation_id])
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD FOREIGN KEY([recipent_company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD FOREIGN KEY([sender_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[negotiation]  WITH CHECK ADD  CONSTRAINT [FK__negotiati__ad_id__628FA481] FOREIGN KEY([ad_id])
REFERENCES [dbo].[advertisement] ([ad_id])
GO
ALTER TABLE [dbo].[negotiation] CHECK CONSTRAINT [FK__negotiati__ad_id__628FA481]
GO
ALTER TABLE [dbo].[negotiation]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[negotiation]  WITH CHECK ADD FOREIGN KEY([contract_id])
REFERENCES [dbo].[contracts] ([contract_id])
GO
ALTER TABLE [dbo].[negotiation]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[negotiation]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[ports]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
ALTER TABLE [dbo].[transaction]  WITH CHECK ADD FOREIGN KEY([contract_id])
REFERENCES [dbo].[contracts] ([contract_id])
GO
ALTER TABLE [dbo].[transaction]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[transaction]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[up_mapping]  WITH CHECK ADD FOREIGN KEY([permission_id])
REFERENCES [dbo].[permission] ([permission_id])
GO
ALTER TABLE [dbo].[up_mapping]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([company_id])
GO
USE [master]
GO
ALTER DATABASE [CC_Models] SET  READ_WRITE 
GO
